// concurrency.async.js
const { fork } = require('child_process');
const path = require('path');

/**
 * Helper to run a task in a separate Process
 */
function runInProcess(taskName, context, index, taskFilePath) {
  return new Promise((resolve, reject) => {
    // Spawns a new Node.js process
    const child = fork(path.join(__dirname, 'worker_process.js'));

    child.on('message', (msg) => {
      if (msg.status === 'success') resolve(msg.result);
      else reject(new Error(msg.error));
    });

    child.on('error', reject);
    
    child.on('exit', (code) => {
      if (code !== 0 && code !== null) {
        reject(new Error(`Process exited with code ${code}`));
      }
    });

    // Send the task details to the child process
    child.send({ taskName, context, index, taskFilePath });
  });
}

/**
 * Main Task Runner
 */
async function runProcessTasks(taskList, resultContext, taskFilePath) {
  console.log("--- Starting Process-Based Execution ---");
  if (!resultContext.results) resultContext.results = [];

  for (let i = 0; i < taskList.length; i++) {
    const step = taskList[i];

    if (Array.isArray(step)) {
      console.log(`Step ${i}: Dispatching Parallel Processes...`);
      
      // Execute each string in the array as a separate process
      const parallelPromises = step.map(taskName => 
        runInProcess(taskName, resultContext, i, taskFilePath)
      );

      const outputs = await Promise.all(parallelPromises);
      resultContext.results.push(...outputs);
    } else {
      console.log(`Step ${i}: Running Serial Task (${step})`);
      
      // Serial tasks run in a process to maintain total isolation
      const output = await runInProcess(step, resultContext, i, taskFilePath);
      resultContext.results.push(output);
    }
  }
  return resultContext;
}

module.exports = {
  runProcessTasks,
  runInProcess
}