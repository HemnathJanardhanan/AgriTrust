import { Router } from 'express';
import { registerFarm } from '../controllers/farm.controller.js';

const router = Router();

router.post('/', registerFarm);

export default router;
