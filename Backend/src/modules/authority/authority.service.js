import prisma from "../../config/prisma.js";
import {
    GET_PENDING_FARMS,
    LOCK_FARM_FOR_DECISION,
    APPROVE_FARM,
    REJECT_FARM,
} from "./authority.queries.js";

export async function fetchPendingFarms() {
    return prisma.$queryRawUnsafe(GET_PENDING_FARMS);
}

export async function decideFarmCertification({
                                                  farmId,
                                                  decision,
                                                  remarks,
                                                  authorityUserId,
                                              }) {
    return prisma.$transaction(async (tx) => {
        const farms = await tx.$queryRawUnsafe(
            LOCK_FARM_FOR_DECISION,
            farmId
        );

        if (farms.length === 0) {
            throw new Error("FARM_NOT_FOUND");
        }

        const currentStatus = farms[0].certification_status;
        const allowedStates = ["SUBMITTED", "UNDER_AUDIT"];

        if (!allowedStates.includes(currentStatus)) {
            throw new Error("INVALID_STATE_TRANSITION");
        }

        if (decision === "APPROVE") {
            await tx.$executeRawUnsafe(
                APPROVE_FARM,
                farmId,
                authorityUserId,
                remarks ?? null
            );

            return {
                farm_id: farmId,
                status: "CERTIFIED",
            };
        }

        await tx.$executeRawUnsafe(
            REJECT_FARM,
            farmId,
            remarks ?? null
        );

        return {
            farm_id: farmId,
            status: "REJECTED",
        };
    });
}
