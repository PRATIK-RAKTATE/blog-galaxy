import { Router } from 'express';
import { metrics, contentType } from './metrics.service.js';

const router = Router();

router.get('/', async (req, res) => {
  res.set('Content-Type', contentType);
  res.end(await metrics());
});

export default router;
