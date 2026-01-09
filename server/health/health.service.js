import { checkDependencies } from './dependancy.checks.js';

let startupComplete = false;

// simulate startup work (migrations, cache warmup, models)
setTimeout(() => {
  startupComplete = true;
}, 5000);

export const liveness = () => ({
  status: 'alive',
  uptime_seconds: process.uptime()
});

export const readiness = async () => {
  const deps = await checkDependencies();
  const ok = Object.values(deps).every(d => d.status === 'up');
  return { ok, dependencies: deps };
};

export const startup = async () => ({
  ok: startupComplete
});

export const dependencies = async () => checkDependencies();

export const version = () => ({
  version: process.env.APP_VERSION || 'dev',
  commit: process.env.GIT_COMMIT || 'local',
  env: process.env.NODE_ENV || 'development',
  started_at: new Date(Date.now() - process.uptime() * 1000)
});
