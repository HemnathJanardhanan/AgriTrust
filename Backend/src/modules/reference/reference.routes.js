import express from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { authorize } from "../auth/rbac.middleware.js";
import { getReference } from "./reference.controller.js";
import plotRoutes from "../plot/plot.routes.js";
const router = express.Router();

router.get(
    "/",
    getReference
);


export default router;
