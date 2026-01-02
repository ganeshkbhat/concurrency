const { expect } = require('chai');
const { runThreadedTasks } = require('../tasks.thread'); // The threaded version
const path = require('path');

describe('Threaded Task Runner', function() {
  // Increase timeout because spawning threads has overhead
  this.timeout(5000);

  let resultContext;
  const taskLibraryPath = path.resolve(process.cwd(), './demos/libmap.js');

  beforeEach(() => {
    resultContext = { results: [] };
  });

  it('should execute a serial task in a thread and return results', async () => {
    const plan = ["taskone"];
    const finalContext = await runThreadedTasks(plan, resultContext, taskLibraryPath);

    expect(finalContext.results).to.have.lengthOf(1);
    expect(finalContext.results[0].name).to.equal('taskone');
    expect(finalContext.results[0].index).to.equal(0);
    expect(finalContext.results[0].result).to.contain('Data from taskone');
  });

  it('should execute parallel tasks across multiple threads', async () => {
    const plan = [["tasktwo", "taskthree", "taskone"]];
    const finalContext = await runThreadedTasks(plan, resultContext, taskLibraryPath);

    expect(finalContext.results).to.have.lengthOf(3);
    
    // All tasks in a parallel block should share the same index
    finalContext.results.forEach(res => {
      expect(res.index).to.equal(0);
    });

    const names = finalContext.results.map(r => r.name);
    expect(names).to.include('tasktwo');
    expect(names).to.include('taskthree');
    expect(names).to.include('taskone');
  });

  it('should preserve execution order and context across serial and parallel boundaries', async () => {
    const plan = [
      "taskone",                       // Index 0
      ["tasktwo", "taskthree"],        // Index 1
      "taskfour"                       // Index 2
    ];

    const finalContext = await runThreadedTasks(plan, resultContext, taskLibraryPath);

    // Total 4 results (1 serial + 2 parallel + 1 serial)
    expect(finalContext.results).to.have.lengthOf(4);

    // Verify correct indexing sequence
    expect(finalContext.results[0].index).to.equal(0);
    expect(finalContext.results[1].index).to.equal(1);
    expect(finalContext.results[2].index).to.equal(1);
    expect(finalContext.results[3].index).to.equal(2);
    
    expect(finalContext.results[3].name).to.equal('taskfour');
  });

  it('should distinguish between multiple runs of the same task name', async () => {
    const plan = ["taskone", "taskone"];
    const finalContext = await runThreadedTasks(plan, resultContext, taskLibraryPath);

    expect(finalContext.results).to.have.lengthOf(2);
    expect(finalContext.results[0].name).to.equal('taskone');
    expect(finalContext.results[1].name).to.equal('taskone');
    
    // They must have different indices
    expect(finalContext.results[0].index).to.equal(0);
    expect(finalContext.results[1].index).to.equal(1);
  });

  it('should report errors if a string name does not exist in libmap.js', async () => {
    const plan = ["invalidTaskName"];
    try {
      await runThreadedTasks(plan, resultContext, taskLibraryPath);
      throw new Error('Test should have failed');
    } catch (err) {
      expect(err.message).to.contain("Task 'invalidTaskName' not found");
    }
  });
});