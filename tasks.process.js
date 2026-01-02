const { fork } = require('child_process');
const path = require('path');
const os = require('os');
const taskMap = require('./demos/libmap.js'); // Import for main process execution

/**
 * Functional Process Pool Factory
 * Creates a persistent set of child processes for parallel tasks.
 */
function createProcessPool(size, taskFilePath) {
  const processes = [];
  const queue = [];

  for (let i = 0; i < size; i++) {
    // Spawns persistent worker processes
    const child = fork(path.join(__dirname, 'worker_process.js'));
    processes.push({ instance: child, inUse: false });
  }

  const execute = (procObj, taskName, context, index, resolve, reject) => {
    procObj.inUse = true;

    const onMessage = (msg) => {
      procObj.instance.off('message', onMessage);
      procObj.inUse = false;

      if (msg.status === 'success') resolve(msg.result);
      else reject(new Error(msg.error));

      // Process next item in queue
      if (queue.length > 0) {
        const next = queue.shift();
        execute(procObj, next.taskName, next.context, next.index, next.resolve, next.reject);
      }
    };

    procObj.instance.on('message', onMessage);
    procObj.instance.send({ taskName, context, index, taskFilePath });
  };

  return {
    runTask: (taskName, context, index) => {
      return new Promise((resolve, reject) => {
        const availableProc = processes.find(p => !p.inUse);
        if (availableProc) {
          execute(availableProc, taskName, context, index, resolve, reject);
        } else {
          queue.push({ taskName, context, index, resolve, reject });
        }
      });
    },
    destroy: () => processes.forEach(p => p.instance.kill())
  };
}

/**
 * Task Runner: Serial on Main Process, Parallel in Child Processes
 */
async function runProcessTasks(taskList, resultContext, taskFileName) {
  const poolSize = Math.max(2, Math.floor(os.cpus().length / 2));
  const pool = createProcessPool(poolSize, path.join(__dirname, taskFileName));
  
  console.log(`--- Starting Mixed Execution (Main Process + Pool: ${poolSize}) ---`);
  if (!resultContext.results) resultContext.results = [];

  try {
    for (let i = 0; i < taskList.length; i++) {
      const taskEntry = taskList[i];

      if (Array.isArray(taskEntry)) {
        // PARALLEL: Dispatch to child process pool
        console.log(`[Main] Dispatching Parallel Block to Child Processes at Index ${i}`);
        const outputs = await Promise.all(
          taskEntry.map(name => pool.runTask(name, resultContext, i))
        );
        resultContext.results.push(...outputs);
      } else {
        // SERIAL: Execute directly on the Main Process
        console.log(`[Main] Running Serial Task '${taskEntry}' on MAIN PROCESS at Index ${i}`);
        const taskFunction = taskMap[taskEntry];
        
        if (!taskFunction) throw new Error(`Task ${taskEntry} not found in main process map.`);
        
        const output = await taskFunction(resultContext, i);
        resultContext.results.push({
          index: i,
          name: taskEntry,
          result: output
        });
      }
    }
  } finally {
    pool.destroy();
  }
  return resultContext;
}

module.exports = {
  createProcessPool,
  runProcessTasks
};