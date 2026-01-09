import * as service from './health.service.js';

export const liveness = async (req, res) => {
  res.status(200).json(service.liveness());
};

export const readiness = async (req, res) => {
  const result = await service.readiness();
  res.status(result.ok ? 200 : 503).json(result);
};

export const startup = async (req, res) => {
  const result = await service.startup();
  res.status(result.ok ? 200 : 503).json(result);
};

export const dependencies = async (req, res) => {
  res.json(await service.dependencies());
};

export const version = async (req, res) => {
  res.json(service.version());
};
