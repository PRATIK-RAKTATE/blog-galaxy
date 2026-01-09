import { Router } from 'express';
import * as controller from './health.controller.js';

const router = Router();

router.get('/liveness', controller.liveness);
router.get('/readiness', controller.readiness);
router.get('/startup', controller.startup);
router.get('/dependencies', controller.dependencies);
router.get('/version', controller.version);

export default router;
