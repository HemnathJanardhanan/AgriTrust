import {loginUser, meContext, registerFarmer as registerFarmerService, registerAuthorityService} from "./auth.service.js";
import { loginSchema, farmerRegisterSchema ,AuthorityRegisterSchema} from "./auth.validation.js";

export async function login(req, res) {
    try {
        console.log(req.headers);
        console.log(req.body);
        const payload = loginSchema.parse(req.body);
        const result = await loginUser(payload);
        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

export async function registerFarmer(req, res) {
    try {
        const payload = farmerRegisterSchema.parse(req.body);
        const result = await registerFarmerService(payload);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


export async function registerAuthority(req, res) {
    try {
        const payload = AuthorityRegisterSchema.parse(req.body);
        const result = await registerAuthorityService(payload);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


// export async function me(req, res) {
//     try{
//         res.json(meContext(req));
//     }catch (err) {
//         res.status(400).json({ error: err.message });
//     }
//     // res.json({
//     //     id: req.user.id,
//     //     email: req.user.email,
//     //     full_name: req.user.full_name,
//     //     role: req.user.role,
//     // });
// }
export async function me(req, res) {
    try {
        const context = await meContext(req.user);
        res.json(context);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load context" });
    }
}
