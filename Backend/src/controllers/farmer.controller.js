import prisma from '../prisma/client.js';

export const registerFarmer = async (req, res) => {
    const { name, phone, district } = req.body;

    if (!name || !phone || !district) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const farmer = await prisma.farmer.create({
            data: { name, phone, district }
        });

        res.status(201).json(farmer);
    } catch (err) {
        if (err.code === 'P2002') {
            return res.status(409).json({ error: 'Phone already registered' });
        }
        res.status(500).json({ error: 'Failed to register farmer' });
    }
};
