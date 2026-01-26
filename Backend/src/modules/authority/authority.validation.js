import { z } from "zod";

export const farmDecisionParamsSchema = z.object({
    farmId: z.string().uuid(),
});

export const farmDecisionBodySchema = z.object({
    decision: z.enum(["APPROVE", "REJECT"]),
    remarks: z.string().max(1000).optional(),
});