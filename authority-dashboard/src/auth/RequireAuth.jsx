import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function RequireAuth({ children }) {
    const { user } = useContext(AuthContext);

    if (!user || !["AUTHORITY", "ADMIN"].includes(user.role)) {
        return <Navigate to="/login" />;
    }

    return children;
}
