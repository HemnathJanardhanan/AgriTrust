import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";
import { AuthContext } from "./AuthContext";

export const AppContext = createContext();
const EMPTY_REFERENCE = {
    soil_types: [],
    irrigation_methods: [],
    crop_types: [],
    certification_types: [],
};
export function AppProvider({ children }) {
    const { token } = useContext(AuthContext);
    const [context, setContext] = useState(null);
    const [loading, setLoading] = useState(false);

    async function loadContext() {
        if (!token) {
            setContext(null);
            return;
        }

        try {
            setLoading(true);
            const [meRes, refRes] = await Promise.all([
                api.get("/auth/me"),
                api.get("/reference"),
            ]);

            setContext({
                ...meRes.data,
                reference: refRes.data ?? EMPTY_REFERENCE,
            });
            //const res = await api.get("/auth/me");
            console.log("App Context : ",meRes.data.onboarding_state);

        } catch (err) {
            console.error("Failed to load context", err.message);
            setContext(null);
        } finally {
            setLoading(false);
        }
    }

    // 🔥 THIS IS THE KEY PART
    useEffect(() => {
        loadContext();
    }, [token]);

    return (
        <AppContext.Provider
            value={{
                context,
                loading,
                reloadContext: loadContext,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

// import React, { createContext, useEffect, useState } from "react";
// import api from "../api/client";
//
// export const AppContext = createContext();
//
// export function AppProvider({ children }) {
//     const [context, setContext] = useState(null);
//     const [loading, setLoading] = useState(true);
//
//     async function loadContext() {
//         try {
//             setLoading(true);
//             const res = await api.get("/me/context");
//             setContext(res.data);
//         } catch (err) {
//             console.error("Failed to load context", err.message);
//             setContext(null);
//         } finally {
//             setLoading(false);
//         }
//     }
//
//     return (
//         <AppContext.Provider
//             value={{
//                 context,
//                 loading,
//                 reloadContext: loadContext,
//             }}
//         >
//             {children}
//         </AppContext.Provider>
//     );
// }
