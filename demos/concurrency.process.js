
const { runProcessTasks, runInProcess }  = require("../tasks.process");

// --- Execution Plan ---
const executionPlan = [
  "taskone",                       // Index 0
  ["tasktwo", "taskthree", "taskone"], // Index 1 (Parallel Processes)
  "taskfour",                      // Index 2
  "taskthree",                     // Index 3
  "taskone"                        // Index 4
];

const resultContext = { results: [] };
const taskLibraryPath = './demos/libmap.js';

runProcessTasks(executionPlan, resultContext, taskLibraryPath)
  .then(final => {
    console.log("\n--- Final Accumulated Results (Process-Based) ---");
    console.log(JSON.stringify(final, null, 2));
  })
  .catch(err => {
    console.error("Execution Error:", err);
  });

