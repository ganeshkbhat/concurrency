const { Worker } = require('worker_threads');
const path = require('path');
const os = require('os');

/**
 * Functional Worker Pool Factory
 * @param {string} taskFilePath - Path to the file containing task functions
 */
function createWorkerPool(size, taskFilePath) {
  const workers = [];
  const queue = [];

  for (let i = 0; i < size; i++) {
    const worker = new Worker(path.join(__dirname, 'worker.js'), { 
      stdout: true,
      workerData: { taskFilePath } // Sending the filename here
    });
    
    worker.stdout.on('data', data => process.stdout.write(data));
    workers.push({ instance: worker, inUse: false });
  }

  const execute = (workerObj, taskName, context, index, resolve, reject) => {
    workerObj.inUse = true;

    const onMessage = (msg) => {
      workerObj.instance.off('message', onMessage);
      workerObj.inUse = false;

      if (msg.status === 'success') resolve(msg.result);
      else reject(new Error(msg.error));

      if (queue.length > 0) {
        const next = queue.shift();
        execute(workerObj, next.taskName, next.context, next.index, next.resolve, next.reject);
      }
    };

    workerObj.instance.on('message', onMessage);
    workerObj.instance.postMessage({ taskName, context, index });
  };

  return {
    runTask: (taskName, context, index) => {
      return new Promise((resolve, reject) => {
        const availableWorker = workers.find(w => !w.inUse);
        if (availableWorker) {
          execute(availableWorker, taskName, context, index, resolve, reject);
        } else {
          queue.push({ taskName, context, index, resolve, reject });
        }
      });
    },
    destroy: () => {
      workers.forEach(w => w.instance.terminate());
    }
  };
}

async function runThreadedTasks(taskList, resultContext, taskFileName) {
  const poolSize = Math.max(2, Math.floor(os.cpus().length / 2));
  const pool = createWorkerPool(poolSize, taskFileName);
  
  console.log(`--- Starting Dynamic Execution (File: ${taskFileName}) ---`);
  if (!resultContext.results) resultContext.results = [];

  try {
    for (let i = 0; i < taskList.length; i++) {
      const taskEntry = taskList[i];

      if (Array.isArray(taskEntry)) {
        console.log(`[Main] Dispatching Parallel Block at Index ${i}`);
        const outputs = await Promise.all(
          taskEntry.map(name => pool.runTask(name, resultContext, i))
        );
        resultContext.results.push(...outputs);
      } else {
        console.log(`[Main] Running Serial Task '${taskEntry}' at Index ${i}`);
        const output = await pool.runTask(taskEntry, resultContext, i);
        resultContext.results.push(output);
      }
    }
  } finally {
    pool.destroy();
  }
  return resultContext;
}

module.exports = {
  createWorkerPool,
  runThreadedTasks
}