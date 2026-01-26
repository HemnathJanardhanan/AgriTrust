import express from 'express';
import cors from 'cors';

import authRoutes from "./modules/auth/auth.routes.js";
import aiRoutes from './modules/rag/rag.routes.js';
import farmRoutes from "./modules/farm/farm.routes.js";
import authorityRoutes from "./modules/authority/authority.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import referenceRoutes from "./modules/reference/reference.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

app.use("/api/auth", authRoutes);
app.use('/api/rag', aiRoutes);
app.use("/api/farms", farmRoutes);
app.use("/api/authority",authorityRoutes);
app.use("/api/reference",referenceRoutes);

export default app;
