const core = require('@actions/core');

const annotate = require('./annotate');
const context  = require('./context');
const inputs   = require('./inputs');
const lint     = require('./lint');

const checks = require('./checks');
const logChecks = async () => {
  console.log(context.repo);
  console.log(context.ref);
  const runs = await checks.list(context.repo, context.sha);
  console.log(runs);
}

async function run() {
  try {
    await logChecks();

    const results = await lint(inputs.path);
    const runId   = await context.getRunId();
    await annotate(context.repo, runId, results);
  } catch (error) {
    core.setFailed(error.message);

    logChecks();
  }
}

run();