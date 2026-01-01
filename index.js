const { runThreadedTasks, createWorkerPool } = require("./tasks.thread");
const { runPromiseTasks } = require("./tasks.async");
const { runProcessTasks, runInProcess }  = require("./tasks.process");

// concurrent-tasks\worker_process.js
// concurrent-tasks\worker.js

module.exports = {
    runThreadedTasks, createWorkerPool,
    runPromiseTasks, runProcessTasks,
    runInProcess
}
