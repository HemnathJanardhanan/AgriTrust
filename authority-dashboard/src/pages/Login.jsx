import { useState, useContext } from "react";
import { login } from "../api/authority.api";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const res = await login({ email, password });
        loginUser(res.data.token);
        navigate("/");
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded w-96">
                <h1 className="text-xl font-bold mb-4">Authority Login</h1>

                <input className="border w-full mb-3 p-2"
                       placeholder="Email"
                       onChange={(e) => setEmail(e.target.value)}
                />

                <input className="border w-full mb-3 p-2"
                       type="password"
                       placeholder="Password"
                       onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleSubmit}
                    className="bg-black text-white w-full p-2 rounded"
                >
                    Login
                </button>
            </div>
        </div>
    );
}
