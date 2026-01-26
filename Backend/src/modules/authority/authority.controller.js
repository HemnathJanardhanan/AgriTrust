import {
    farmDecisionParamsSchema,
    farmDecisionBodySchema,
} from "./authority.validation.js";
import {
    fetchPendingFarms,
    decideFarmCertification as decideFarmCertificationService,
} from "./authority.service.js";

export const getPendingFarms = async (req, res) => {
    try {
        console.log("getPendingFarms called");
        const farms = await fetchPendingFarms();

        return res.json({
            count: farms.length,
            farms,
        });
    } catch (err) {
        console.error("Error fetching pending farms", err);
        return res.status(500).json({
            error: "Failed to fetch pending farms",
        });
    }
};

export const decideFarmCertification = async (req, res) => {
    try {
        const { farmId } = farmDecisionParamsSchema.parse(req.params);
        const { decision, remarks } = farmDecisionBodySchema.parse(req.body);

        const authorityUser = req.user;

        const result = await decideFarmCertificationService({
            farmId,
            decision,
            remarks,
            authorityUserId: authorityUser.id,
        });

        return res.json({
            ...result,
            decided_by: authorityUser.id,
            decided_at: new Date(),
        });
    } catch (err) {
        if (err.message === "FARM_NOT_FOUND") {
            return res.status(404).json({ message: "Farm not found" });
        }

        if (err.message === "INVALID_STATE_TRANSITION") {
            return res.status(409).json({
                message: "Farm is not in a state that can be approved or rejected",
            });
        }

        if (err.name === "ZodError") {
            return res.status(400).json({
                message: "Invalid request payload",
                issues: err.errors,
            });
        }

        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
};
