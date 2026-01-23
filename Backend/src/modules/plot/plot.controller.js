import { plotCreateSchema } from "./plot.validation.js";
import { createPlot } from "./plot.service.js";

export async function createPlotHandler(req, res) {
    try {
        const payload = plotCreateSchema.parse(req.body);

        const result = await createPlot({
            user: req.user,
            farmId: req.params.farmId,
            payload,
        });

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
