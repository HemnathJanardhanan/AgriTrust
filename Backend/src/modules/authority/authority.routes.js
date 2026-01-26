import express from "express";
import { getPendingFarms,decideFarmCertification } from "./authority.controller.js";
import { authorize } from "../auth/rbac.middleware.js";
import {authenticate} from "../auth/auth.middleware.js";

const router = express.Router();
/**
 * @swagger
 * /api/authority/farms/pending:
 *   get:
 *     summary: Get farms pending certification approval
 *     tags: [Authority]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending farms
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
router.get(
    "/farms/pending",
    authenticate,
    authorize("AUTHORITY", "ADMIN"),
    getPendingFarms
);

router.post(
    "/farms/:farmId/decision",
    authenticate,
    authorize("AUTHORITY", "ADMIN"),
    decideFarmCertification
);

export default router;
