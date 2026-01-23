import express from 'express';
import cors from 'cors';

import authRoutes from "./modules/auth/auth.routes.js";
import aiRoutes from './modules/rag/rag.routes.js';
import farmRoutes from "./modules/farm/farm.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/rag', aiRoutes);
app.use("/api/farms", farmRoutes);

export default app;
