import prisma from "../../config/prisma.js";
import { verifyToken } from "../../config/jwt.js";

export async function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

    if (!token) {
        return res.status(401).json({ error: "Missing token" });
    }

    try {
        const decoded = verifyToken(token);

        const user = await prisma.app_user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                full_name: true,
                role: true,
                account_status: true,
            },
        });

        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }

        if (user.account_status !== "ACTIVE") {
            return res.status(403).json({ error: "Account not active" });
        }

        req.user = user; // authoritative user
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}
