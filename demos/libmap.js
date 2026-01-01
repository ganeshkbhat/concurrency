
// --- Task Definitions ---
const taskone = async (context, index) => {
  console.log(`[Step ${index}] Running: taskone`);
  await new Promise(resolve => setTimeout(resolve, 50));
  return `Data from taskone`;
};

const tasktwo = async (context, index) => {
  console.log(`[Step ${index}] Running: tasktwo`);
  await new Promise(resolve => setTimeout(resolve, 50));
  return "Data from tasktwo";
};

const taskthree = async (context, index) => {
  console.log(`[Step ${index}] Running: taskthree`);
  await new Promise(resolve => setTimeout(resolve, 50));
  return "Data from taskthree";
};

const taskfour = async (context, index) => {
  console.log(`[Step ${index}] Running: taskfour`);
  await new Promise(resolve => setTimeout(resolve, 50));
  return "Data from taskfour";
};

// Map of tasks for the Worker to reference by name
const taskMap = { taskone, tasktwo, taskthree, taskfour };

module.exports = taskMap;
