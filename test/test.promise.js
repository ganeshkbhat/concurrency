const { expect } = require('chai');
const { runPromiseTasks } = require('../tasks.async');
const path = require('path');

describe('Promise-Based Task Runner', () => {
  let resultContext;
  const taskLibraryPath = './demos/libmap.js';

  beforeEach(() => {
    // Reset context before each test
    resultContext = { results: [] };
  });

  it('should execute a single serial task and update the context', async () => {
    const plan = ['taskone'];
    const finalContext = await runPromiseTasks(plan, resultContext, taskLibraryPath);

    expect(finalContext.results).to.have.lengthOf(1);
    expect(finalContext.results[0]).to.deep.include({
      index: 0,
      name: 'taskone'
    });
    expect(finalContext.results[0].result).to.contain('Data from taskone');
  });

  it('should execute tasks in the correct serial order', async () => {
    const plan = ['taskone', 'taskfour'];
    const finalContext = await runPromiseTasks(plan, resultContext, taskLibraryPath);

    expect(finalContext.results[0].name).to.equal('taskone');
    expect(finalContext.results[1].name).to.equal('taskfour');
    expect(finalContext.results[1].index).to.equal(1);
  });

  it('should execute parallel blocks correctly', async () => {
    const plan = [['tasktwo', 'taskthree']];
    const finalContext = await runPromiseTasks(plan, resultContext, taskLibraryPath);

    expect(finalContext.results).to.have.lengthOf(2);
    // Both parallel tasks should share the same step index
    expect(finalContext.results[0].index).to.equal(0);
    expect(finalContext.results[1].index).to.equal(0);
    
    const names = finalContext.results.map(r => r.name);
    expect(names).to.include('tasktwo');
    expect(names).to.include('taskthree');
  });

  it('should maintain order for complex plans (Serial -> Parallel -> Serial)', async () => {
    const plan = [
      'taskone', 
      ['tasktwo', 'taskthree'], 
      'taskfour'
    ];
    const finalContext = await runPromiseTasks(plan, resultContext, taskLibraryPath);

    // Total 4 result entries (1 + 2 + 1)
    expect(finalContext.results).to.have.lengthOf(4);
    
    // Check indices
    expect(finalContext.results[0].index).to.equal(0); // taskone
    expect(finalContext.results[1].index).to.equal(1); // parallel part 1
    expect(finalContext.results[2].index).to.equal(1); // parallel part 2
    expect(finalContext.results[3].index).to.equal(2); // taskfour
  });

  it('should allow repeated tasks and distinguish them by index', async () => {
    const plan = ['taskone', 'taskone'];
    const finalContext = await runPromiseTasks(plan, resultContext, taskLibraryPath);

    expect(finalContext.results).to.have.lengthOf(2);
    expect(finalContext.results[0].index).to.equal(0);
    expect(finalContext.results[1].index).to.equal(1);
    expect(finalContext.results[0].name).to.equal(finalContext.results[1].name);
  });

  it('should throw an error if a task name is not found in the map', async () => {
    const plan = ['nonExistentTask'];
    try {
      await runPromiseTasks(plan, resultContext, taskLibraryPath);
      throw new Error('Should have failed');
    } catch (err) {
      expect(err.message).to.contain("Task 'nonExistentTask' not found");
    }
  });
});