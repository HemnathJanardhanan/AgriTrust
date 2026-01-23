import { farmCreateSchema } from "./farm.validation.js";
import { createFarm } from "./farm.service.js";

export async function createFarmHandler(req, res) {
    try {
        const payload = farmCreateSchema.parse(req.body);
        console.log("Inside Farm Controller : ",payload);
        const result = await createFarm({
            user: req.user,
            payload,
        });

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({
            error: err.message,
        });
    }
}
