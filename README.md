# concurrency.js

npm module to work with concurrency - worker threads and worker processes easily using simple functions and script files


# Installation


```
npm install concurrency.js --save
```

Find the demos in the [demos folder](./demos)


<br/>

Run tasks in async mode using promises as simple as below:

```
// This repository's root folder
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
// This repository's demos folder
const taskLibraryPath = './demos/libmap.js';

runPromiseTasks(executionPlan, resultContext, taskLibraryPath)
    .then((finalContext) => {
        console.log("\n--- Promises Based Final Accumulated Results Context ---");
        console.log(JSON.stringify(finalContext, null, 2));
    })
    .catch((err) => {
        console.error("Task execution failed:", err);
    });
```

Run tasks in a mix of nodejs code and run threaded code of nodejs execution plan

```
// This repository's root folder
const {runThreadedTasks, createWorkerPool} = require("../tasks.thread")

// --- Execution Plan ---
const executionPlan = [
  "taskone",
  ["tasktwo", "taskthree", "taskone"], // Threaded parallel
  "taskfour",
  "taskthree",
  "taskone"
];

const resultContext = { results: [] };
// This repository's demos folder
const taskFileName = './demos/libmap.js'; 

// The file to be imported dynamically
//      from concurrent-tasks\worker.js

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
```

Run tasks in a mix of nodejs code and run process worker code of nodejs execution plan

```
// This repository's root folder
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
// This repository's demos folder

runProcessTasks(executionPlan, resultContext, taskLibraryPath)
  .then(final => {
    console.log("\n--- Final Accumulated Results (Process-Based) ---");
    console.log(JSON.stringify(final, null, 2));
  })
  .catch(err => {
    console.error("Execution Error:", err);
  });

```

## Contributions

Contributions, Feature Improvements, Bugs, and Issues are invited. [raising an issue](https://github.com/ganeshkbhat/concurrency.js/issues)

## TODO

[Todo](./todo)

# License

[MIT License](./LICENSE)
