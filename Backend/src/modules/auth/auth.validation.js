import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const farmerRegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    full_name: z.string().min(3),
    phone_number: z.string().optional(),
    district: z.string(),
    state: z.string(),
    village: z.string().optional(),
    taluk: z.string().optional(),
});
