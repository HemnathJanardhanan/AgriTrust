import express from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/rbac.middleware.js";
import { createPlotHandler } from "./plot.controller.js";

const router = express.Router({ mergeParams: true });

router.post(
    "/",
    authenticate,
    authorize("FARMER"),
    createPlotHandler
);

export default router;
