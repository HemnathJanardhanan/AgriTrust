import express from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/rbac.middleware.js";
import { createFarmHandler } from "./farm.controller.js";
import plotRoutes from "../plot/plot.routes.js";
const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("FARMER"),
    createFarmHandler
);


router.use("/:farmId/plots", plotRoutes);

export default router;
