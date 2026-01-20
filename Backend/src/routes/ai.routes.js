import { Router } from 'express';
import { askQuestion } from '../controllers/ai.controller.js';

const router = Router();

router.post('/ask', askQuestion);

export default router;
