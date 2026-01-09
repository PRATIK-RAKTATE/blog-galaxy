import * as db from '../infra/db.js';
import * as redis from '../infra/redis.js';

export const checkDependencies = async () => ({
  database: await db.health(),
  redis: await redis.health()
});
