import bcrypt from "bcryptjs";
import prisma  from "../../config/prisma.js";
import { signToken } from "../../config/jwt.js";

export async function loginUser({ email, password }) {
    console.log({email, password});
    const user = await prisma.app_user.findUnique({
        where: { email },
    });

    if (!user) throw new Error("Invalid credentials");

    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) throw new Error("Invalid credentials");

    const token = signToken({
        userId: user.id,
        role: user.role,
    });

    await prisma.app_user.update({
        where: { id: user.id },
        data: { last_login_at: new Date() },
    });

    return { token, role: user.role };
}

export async function registerFarmer(data) {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    return prisma.$transaction(async (tx) => {
        const user = await tx.app_user.create({
            data: {
                email: data.email,
                password_hash: hashedPassword,
                full_name: data.full_name,
                phone_number: data.phone_number,
                role: "FARMER",
                account_status: "ACTIVE",
            },
        });

        const farmer = await tx.farmer.create({
            data: {
                user_id: user.id,
                district: data.district,
                state: data.state,
                village: data.village,
                taluk: data.taluk,
            },
        });

        const token = signToken({
            userId: user.id,
            role: user.role,
        });

        console.log(token);
        return { token, userId: user.id, farmerId: farmer.id };
    });
}
