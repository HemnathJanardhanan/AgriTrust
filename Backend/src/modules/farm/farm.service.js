import prisma from "../../config/prisma.js";
import { geoJSONToPostGIS } from "./farm.geo.js";

export async function createFarm({ user, payload }) {
    // 1. Ensure farmer identity exists
    const farmer = await prisma.farmer.findUnique({
        where: { user_id: user.id },
    });

    if (!farmer) {
        throw new Error("Farmer profile not found");
    }
    //console.log("Prisma models:", Object.keys(prisma));
    const geojson = JSON.stringify(payload.boundary);
    // 2. Create farm in DRAFT state
    // const farm = await prisma.farm.create({
    //     data: {
    //         farmer_id: farmer.id,
    //         name: payload.name,
    //         boundary: geoJSONToPostGIS(payload.boundary),
    //         certification_status: "DRAFT",
    //     },
    // });
    const result = await prisma.$queryRaw`
      INSERT INTO farm (
        farmer_id,
        name,
        boundary
      )
      VALUES (
        ${farmer.id}::uuid,
        ${payload.name},
        ST_SetSRID(ST_GeomFromGeoJSON(${geojson}), 4326)
      )
      RETURNING
        id,
        name,
        certification_status,
        created_at;
    `;
    console.log(result);
    return {
        farmId: result[0].id,
        status: result[0].certification_status,
    };
}
