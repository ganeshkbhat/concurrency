const { runPromiseTasks } = require("../tasks.async.js");

// --- Execution Plan using String Names ---
const executionPlan = [
    "taskone",                       // Index 0
    ["tasktwo", "taskthree", "taskone"], // Index 1 (Parallel)
    "taskfour",                      // Index 2
    "taskthree",                     // Index 3
    "taskone"                        // Index 4
];

const resultContext = {};
const taskLibraryPath = './demos/libmap.js';

runPromiseTasks(executionPlan, resultContext, taskLibraryPath)
    .then((finalContext) => {
        console.log("\n--- Promises Based Final Accumulated Results Context ---");
        console.log(JSON.stringify(finalContext, null, 2));
    })
    .catch((err) => {
        console.error("Task execution failed:", err);
    });