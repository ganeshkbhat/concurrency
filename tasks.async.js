const path = require('path');

/**
 * Task Runner for Serial and Parallel Execution
 * * Logic:
 * - Resolves function names provided as strings using the taskMap.
 * - Maintains strict order based on the executionPlan.
 * - Passes the 'resultContext' and current 'index' into every task.
 * - Accumulates results in a generic list to avoid key-overwriting.
 */
async function runPromiseTasks(taskList, resultContext, taskFilePath) {
  console.log("Starting task execution sequence...");

  // Dynamically load the task map from the provided library file
  const taskMap = require(path.resolve(taskFilePath));

  // Initialize the results array in context if it doesn't exist
  if (!resultContext.results) {
    resultContext.results = [];
  }

  for (let i = 0; i < taskList.length; i++) {
    const step = taskList[i];

    if (Array.isArray(step)) {
      // Parallel Execution
      console.log(`Step Index ${i}: Executing Parallel Block`);
      
      const parallelPromises = step.map(async (taskName) => {
        const taskFunction = taskMap[taskName];
        if (!taskFunction) {
          throw new Error(`Task '${taskName}' not found in ${taskFilePath}`);
        }
        
        // Execute task and capture result with metadata
        const data = await taskFunction(resultContext, i);
        return {
          index: i,
          name: taskName,
          result: data
        };
      });

      // Wait for all parallel tasks in this block to complete
      const parallelResults = await Promise.all(parallelPromises);
      resultContext.results.push(...parallelResults);
    } else {
      // Serial Execution
      console.log(`Step Index ${i}: Executing Serial Task (${step})`);
      
      const taskFunction = taskMap[step];
      if (!taskFunction) {
        throw new Error(`Task '${step}' not found in ${taskFilePath}`);
      }

      const data = await taskFunction(resultContext, i);
      
      // Accumulate serial result into the context immediately
      resultContext.results.push({
        index: i,
        name: step,
        result: data
      });
    }
  }

  return resultContext;
}

module.exports = {
  runPromiseTasks
};