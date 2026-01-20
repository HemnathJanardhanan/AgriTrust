import prisma from '../prisma/client.js';

export const registerFarm = async (req, res) => {
    const { farmerId, location, areaAcres, soilType } = req.body;

    if (!farmerId || !location || !areaAcres || !soilType) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const farm = await prisma.farm.create({
            data: {
                farmerId,
                location,
                areaAcres,
                soilType
            }
        });

        res.status(201).json(farm);
    } catch (err) {
        res.status(500).json({ error: 'Failed to register farm' });
    }
};
