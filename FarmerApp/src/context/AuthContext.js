import React, { createContext, useEffect, useState } from "react";
import { saveToken, getToken, deleteToken } from "../utils/tokenStorage";
import api from "../api/client";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        bootstrapAuth();
    }, []);

    async function bootstrapAuth() {
        try {
            const token = await getToken();
            if (token) {
                setUserToken(token);
            }
        } finally {
            setLoading(false);
        }
    }

    async function login(email, password) {
        console.log("Inside Login : ", email,password);
        const res = await api.post("/auth/login", {
            email,
            password,
        });
        console.log("Inside Login : ",res.data);
        const token = res.data.token;
        await saveToken(token);
        setUserToken(token);
    }

    async function logout() {
        await deleteToken();
        setUserToken(null);
    }

    return (
        <AuthContext.Provider
            value={{
                token:userToken,
                loading,
                isAuthenticated: !!userToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
