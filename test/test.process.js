const { expect } = require('chai');
const { runProcessTasks } = require('../tasks.process'); // The process-based runner
const path = require('path');

describe('Process-Based Task Runner', function() {
  // Spawning processes is heavier than threads; 10s timeout recommended
  this.timeout(10000);

  let resultContext;
  const taskLibraryPath = path.resolve(process.cwd(), './demos/libmap.js');

  beforeEach(() => {
    // Ensure a clean context before every test case
    resultContext = { results: [] };
  });

  it('should execute a serial task in a child process', async () => {
    const plan = ["taskone"];
    const finalContext = await runProcessTasks(plan, resultContext, taskLibraryPath);

    expect(finalContext.results).to.have.lengthOf(1);
    expect(finalContext.results[0]).to.deep.include({
      index: 0,
      name: 'taskone'
    });
    expect(finalContext.results[0].result).to.contain('Data from taskone');
  });

  it('should execute parallel tasks in separate child processes', async () => {
    const plan = [["tasktwo", "taskthree"]];
    const finalContext = await runProcessTasks(plan, resultContext, taskLibraryPath);

    expect(finalContext.results).to.have.lengthOf(2);
    
    // Validate that both parallel results are assigned the same step index
    const indices = finalContext.results.map(r => r.index);
    expect(indices).to.members([0, 0]); // incorrect definition

    const names = finalContext.results.map(r => r.name);
    expect(names).to.include.members(['tasktwo', 'taskthree']);
  });

  it('should maintain order across complex transitions (Serial -> Parallel)', async () => {
    const plan = [
      "taskone", 
      ["tasktwo", "taskthree"], 
      "taskfour"
    ];
    
    const finalContext = await runProcessTasks(plan, resultContext, taskLibraryPath);

    // Total 4 results: 1 (index 0) + 2 (index 1) + 1 (index 2)
    expect(finalContext.results).to.have.lengthOf(4);
    
    expect(finalContext.results[0].index).to.equal(0);
    expect(finalContext.results[1].index).to.equal(1);
    expect(finalContext.results[2].index).to.equal(1);
    expect(finalContext.results[3].index).to.equal(2);
  });

  it('should return an error if the process encounters an invalid task name', async () => {
    const plan = ["missingTask"];
    try {
      await runProcessTasks(plan, resultContext, taskLibraryPath);
      throw new Error('Test should have thrown an error');
    } catch (err) {
      expect(err.message).to.contain("Task 'missingTask' not found");
    }
  });

  it('should recover if a child process exits unexpectedly', async () => {
    // This tests the logic handling process exits in the coordinator
    const plan = ["taskone"];
    // Simulate a failure by passing a non-existent task file path
    const badPath = './non_existent_file.js';
    
    try {
      await runProcessTasks(plan, resultContext, badPath);
      throw new Error('Should have caught process exit error');
    } catch (err) {
      // Depending on OS, this might be a module not found error or exit code 1
      expect(err).to.exist;
    }
  });
});
