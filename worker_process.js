const path = require('path');

process.on('message', async ({ taskName, context, index, taskFilePath }) => {
  try {
    const taskMap = require(path.resolve(taskFilePath));
    const taskFunction = taskMap[taskName];
    const resultValue = await taskFunction(context, index);

    process.send({
      status: 'success',
      result: { index, name: taskName, result: resultValue }
    });
  } catch (error) {
    process.send({ status: 'error', error: error.message });
  }
});