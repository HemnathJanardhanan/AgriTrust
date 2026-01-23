import prisma from "../../config/prisma.js";
import { polygonToWKT } from "./plot.geo.js";

export async function createPlot({ user, farmId, payload }) {
    // 1. Verify farm ownership
    const farm = await prisma.farm.findFirst({
        where: {
            id: farmId,
            farmer: {
                user_id: user.id,
            },
        },
        select: { id: true },
    });

    if (!farm) {
        throw new Error("Farm not found or access denied");
    }

    // 2. Validate soil type
    const soilExists = await prisma.soil_type.findUnique({
        where: { id: payload.soil_type_id },
        select: { id: true },
    });

    if (!soilExists) {
        throw new Error("Invalid soil type");
    }

    const wkt = polygonToWKT(payload.boundary);

    // 3. Transaction
    return prisma.$transaction(async (tx) => {
        // 🔥 RAW SQL for geometry
        const [plot] = await tx.$queryRaw`
            INSERT INTO plot (
                id,
                farm_id,
                name,
                soil_type_id,
                area_hectares,
                boundary,
                created_at,
                updated_at
            )
            VALUES (
                gen_random_uuid(),
                ${farm.id}::uuid,
                ${payload.name},
                ${payload.soil_type_id}::uuid,
                ${payload.area_hectares},
                ST_SetSRID(ST_GeomFromText(${wkt}), 4326),
                now(),
                now()
            )
            RETURNING id;
        `;

        // 4. Irrigation mappings
        for (const method of payload.irrigation_methods) {
            await tx.plot_irrigation_methods.create({
                data: {
                    plot_id: plot.id,
                    irrigation_method_id: method.id,
                    is_primary: method.is_primary,
                },
            });
        }
        console.log({
            plotId: plot.id,
            farmId: farm.id,
        })
        return {
            plotId: plot.id,
            farmId: farm.id,
        };
    });
}

// import prisma from "../../config/prisma.js";
// import { polygonToPostGIS } from "./plot.geo.js";
//
// export async function createPlot({ user, farmId, payload }) {
//     // 1. Verify farm ownership
//     const farm = await prisma.farm.findFirst({
//         where: {
//             id: farmId,
//             farmer: {
//                 user_id: user.id,
//             },
//         },
//     });
//
//     if (!farm) {
//         throw new Error("Farm not found or access denied");
//     }
//
//     // 2. Validate soil type exists
//     const soil = await prisma.soil_type.findUnique({
//         where: { id: payload.soil_type_id },
//     });
//
//     if (!soil) {
//         throw new Error("Invalid soil type");
//     }
//
//     // 3. Transaction: plot + irrigation mapping
//     return prisma.$transaction(async (tx) => {
//         const plot = await tx.plot.create({
//             data: {
//                 farm_id: farm.id,
//                 name: payload.name,
//                 soil_type_id: payload.soil_type_id,
//                 area_hectares: payload.area_hectares,
//                 boundary: polygonToPostGIS(payload.boundary),
//             },
//         });
//
//         for (const method of payload.irrigation_methods) {
//             await tx.plot_irrigation_methods.create({
//                 data: {
//                     plot_id: plot.id,
//                     irrigation_method_id: method.id,
//                     is_primary: method.is_primary,
//                 },
//             });
//         }
//
//         return {
//             plotId: plot.id,
//             farmId: farm.id,
//         };
//     });
// }
