import { Router } from 'express';
import { registerFarmer } from '../controllers/farmer.controller.js';

const router = Router();

router.post('/', registerFarmer);

export default router;  // ✅ Must export the Router instance
