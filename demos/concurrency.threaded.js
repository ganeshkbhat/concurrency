
const {runThreadedTasks, createWorkerPool} = require("../tasks.thread")

// --- Execution Plan ---
const executionPlan = [
  "taskone",
  ["tasktwo", "taskthree", "taskone"],
  "taskfour",
  "taskthree",
  "taskone"
];

const resultContext = { results: [] };
const taskFileName = './demos/libmap.js'; // The file to be imported dynamically
// concurrent-tasks\worker.js
runThreadedTasks(executionPlan, resultContext, taskFileName)
  .then(final => {
    console.log("\n--- Threads Based Final Accumulated Results ---");
    console.log(JSON.stringify(final, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error("Fatal Error:", err);
    process.exit(1);
  });
