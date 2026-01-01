// worker_process.js
const path = require('path');

// Listen for messages from the parent process
process.on('message', async ({ taskName, context, index, taskFilePath }) => {
  try {
    // Dynamically load the task map
    const taskMap = require(path.resolve(taskFilePath));
    const taskFunction = taskMap[taskName];

    if (!taskFunction) {
      throw new Error(`Task '${taskName}' not found in ${taskFilePath}`);
    }

    // Execute the task
    const resultValue = await taskFunction(context, index);

    // Send the result back to the parent
    process.send({
      status: 'success',
      result: { index, name: taskName, result: resultValue }
    });
  } catch (error) {
    process.send({ status: 'error', error: error.message });
  } finally {
    // Process exits after task completion to free up system memory
    process.exit(0);
  }
});