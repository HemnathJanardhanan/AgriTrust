import { askRag } from './rag.service.js';

export const askQuestion = async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }

    try {
        const answer = await askRag(question);
        res.json(answer);
    } catch (err) {
        res.status(502).json({ error: 'AI service unavailable' });
    }
};