const { parentPort, workerData } = require('worker_threads');
const path = require('path');

// Dynamically import the task map using the file path provided in workerData
const taskFilePath = path.resolve(workerData.taskFilePath);
const taskMap = require(taskFilePath);

parentPort.on('message', async ({ taskName, context, index }) => {
  try {
    const taskFunction = taskMap[taskName];
    if (!taskFunction) {
      throw new Error(`Task '${taskName}' not found in file: ${workerData.taskFilePath}`);
    }

    const resultValue = await taskFunction(context, index);
    
    parentPort.postMessage({ 
      status: 'success', 
      result: { index, name: taskName, result: resultValue } 
    });
  } catch (error) {
    parentPort.postMessage({ status: 'error', error: error.message });
  }
});