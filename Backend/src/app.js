import express from 'express';
import cors from 'cors';

import farmerRoutes from './routes/farmer.routes.js';
import farmRoutes from './routes/farm.routes.js';
import aiRoutes from './routes/ai.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/farmers', farmerRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/ai', aiRoutes);

export default app;
