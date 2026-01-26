import React, { useContext, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen({navigation}) {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleLogin() {
        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            console.log(email,password);
            await login(email.trim().toLowerCase(), password);
        } catch (err) {
            console.log("LOGIN ERROR FULL:", err);
            console.log("LOGIN ERROR RESPONSE:", err?.response?.data);
            setError(
                err.response?.data?.error || "Login failed. Try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <View className="flex-1 justify-center px-6">

                {/* Header */}
                <Text className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back
                </Text>
                <Text className="text-gray-500 mb-8">
                    Login to manage your farm
                </Text>

                {/* Email */}
                <View className="mb-4">
                    <Text className="text-gray-700 mb-1">Email</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="farmer@email.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                    />
                </View>

                {/* Password */}
                <View className="mb-4">
                    <Text className="text-gray-700 mb-1">Password</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="••••••••"
                        secureTextEntry
                        className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900"
                    />
                </View>

                {/* Error */}
                {error && (
                    <Text className="text-red-600 mb-4">
                        {error}
                    </Text>
                )}

                {/* Button */}
                <TouchableOpacity
                    onPress={handleLogin}
                    disabled={loading}
                    className={`rounded-lg py-4 items-center ${
                        loading ? "bg-gray-400" : "bg-green-700"
                    }`}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white font-semibold text-lg">
                            Login
                        </Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    className="mt-4"
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text className="text-center text-gray-600">
                        Don’t have an account? Register
                    </Text>
                </TouchableOpacity>


            </View>
        </KeyboardAvoidingView>
    );
}
