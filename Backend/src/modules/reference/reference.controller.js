import prisma from "../../config/prisma.js";

export async function getReference(req, res) {
    try {
        const [
            soilTypes,
            irrigationMethods,
            // cropTypes,
            // certificationTypes,
        ] = await Promise.all([
            prisma.soil_type.findMany({

                orderBy: { name: 'asc' },
            }),
            prisma.irrigation_method.findMany({
                
                orderBy: { name: 'asc' },
            }),
            // prisma.cropType.findMany({
            //     where: { active: true },
            //     orderBy: { name: 'asc' },
            // }),
            // prisma.certificationType.findMany({
            //     where: { active: true },
            // }),
        ]);

        res.json({
            soil_types: soilTypes,
            irrigation_methods: irrigationMethods,
            // crop_types: cropTypes,
            // certification_types: certificationTypes,
        });
    } catch (err) {
        console.error("REFERENCE_FETCH_FAILED", err);
        res.status(500).json({ error: "Failed to load reference data" });
    }
}
