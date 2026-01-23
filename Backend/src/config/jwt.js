import jwt from "jsonwebtoken";
import { env } from "./env.js";

export const signToken = (payload) =>{
    if (!env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "8h" });
}
export const verifyToken = (token) => {
    if (!env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }

    return jwt.verify(token, env.JWT_SECRET);
}
