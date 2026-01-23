import { z } from "zod";

const coordinate = z.tuple([
    z.number().min(-180).max(180),
    z.number().min(-90).max(90),
]);

const linearRing = z.array(coordinate).min(4);

export const plotCreateSchema = z.object({
    name: z.string().min(3).optional(),
    soil_type_id: z.string().uuid(),
    area_hectares: z.number().positive(),
    boundary: z.object({
        type: z.literal("Polygon"),
        coordinates: z.array(linearRing),
    }),
    irrigation_methods: z.array(
        z.object({
            id: z.string().uuid(),
            is_primary: z.boolean().default(false),
        })
    ).min(1),
});
