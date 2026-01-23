import { Router } from 'express';
import { askQuestion } from './rag.controller.js';

const router = Router();

router.post('/ask', askQuestion);

export default router;