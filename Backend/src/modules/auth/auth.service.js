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
    console.log(user.role);
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

export async function registerAuthorityService(data) {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    return prisma.$transaction(async (tx) => {
        const user = await tx.app_user.create({
            data: {
                email: data.email,
                password_hash: hashedPassword,
                full_name: data.full_name,
                phone_number: data.phone_number,
                role: "AUTHORITY",
                account_status: "ACTIVE",
            },
        });

        const token = signToken({
            userId: user.id,
            role: user.role,
        });

        console.log(token);
        return { token, userId: user.id};
    });
}

export async function meContext(user) {
    // Non-farmer users
    if (user.role !== "FARMER") {
        return {
            user,
            onboarding_state: "NOT_FARMER",
        };
    }

    // 1. Farmer
    const farmer = await prisma.farmer.findUnique({
        where: { user_id: user.id },
        select: { id: true },
    });

    if (!farmer) {
        return {
            user,
            farmer: { exists: false },
            onboarding_state: "NOT_FARMER",
        };
    }

    // 2. Farm
    const farm = await prisma.farm.findFirst({
        where: { farmer_id: farmer.id },
        select: {
            id: true,
            certification_status: true,
        },
    });

    if (!farm) {
        return {
            user,
            farmer: { id: farmer.id, exists: true },
            onboarding_state: "FARMER_PROFILE_CREATED",
        };
    }

    // 3. Plots
    const plotCount = await prisma.plot.count({
        where: { farm_id: farm.id },
    });

    if (plotCount === 0) {
        return {
            user,
            farmer: { id: farmer.id, exists: true },
            farm: {
                id: farm.id,
                certification_status: farm.certification_status,
            },
            plot: { count: 0, items: [] },
            onboarding_state: "FARM_CREATED",
        };
    }

    // Fetch plots ONLY when they exist
    const plots = await prisma.plot.findMany({
        where: { farm_id: farm.id },
        select: {
            id: true,
            name: true,
            area_hectares: true,
        },
    });

    // Fully onboarded
    return {
        user,
        farmer: { id: farmer.id, exists: true },
        farm: {
            id: farm.id,
            certification_status: farm.certification_status,
        },
        plot: {
            count: plotCount,
            items: plots,
        },
        onboarding_state: "ONBOARDED",
    };

//
// export async function meContext(user) {
//         // Non-farmer users
//         if (user.role !== "FARMER") {
//             return ({
//                 user,
//                 onboarding_state: "NOT_FARMER",
//             });
//         }
//
//         // 1. Farmer
//         const farmer = await prisma.farmer.findUnique({
//             where: { user_id: user.id },
//             select: { id: true },
//         });
//
//         if (!farmer) {
//             return ({
//                 user,
//                 farmer: { exists: false },
//                 onboarding_state: "NOT_FARMER",
//             });
//         }
//
//         // 2. Farm
//         const farm = await prisma.farm.findFirst({
//             where: { farmer_id: farmer.id },
//             select: {
//                 id: true,
//                 certification_status: true,
//             },
//         });
//         console.log(farm);
//         if (!farm) {
//             return ({
//                 user,
//                 farmer: { id: farmer.id, exists: true },
//                 onboarding_state: "FARMER_PROFILE_CREATED",
//             });
//         }else{
//             const plotCount = await prisma.plot.count({
//                 where: { farm_id: farm.id },
//             });
//
//             if (plotCount === 0) {
//                 return ({
//                     user,
//                     farmer: { id: farmer.id, exists: true },
//                     farm: {
//                         id: farm.id,
//                         certification_status: farm.certification_status,
//                     },
//                     plot: { count: 0 },
//                     onboarding_state: "FARM_CREATED",
//                 });
//             }
//         }
//
//         // Fully onboarded
//         return ({
//             user,
//             farmer: { id: farmer.id, exists: true },
//             farm: {
//                 id: farm.id,
//                 certification_status: farm.certification_status,
//             },
//             plot: { count: plotCount },
//             onboarding_state: "ONBOARDED",
//         });

}
