import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import api from "../api/client";

export default function RegisterScreen({ navigation }) {
    const { loginWithToken } = useContext(AuthContext);

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        password: "",
        phone_number: "",
        district: "",
        state: "",
        village:"",
        taluk:""
    });

    const [loading, setLoading] = useState(false);

    function update(key, value) {
        setForm({ ...form, [key]: value });
    }

    async function submit() {
        if (!form.email || !form.password || !form.full_name) {
            Alert.alert("Error", "All required fields must be filled");
            return;
        }

        try {
            setLoading(true);
            const { token } = await api.post("/auth/register/farmer", form);
            await loginWithToken(token);
        } catch (err) {
            Alert.alert(
                "Registration Failed",
                err.response?.data?.error || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <View className="flex-1 justify-center px-6 bg-white">
            <Text className="text-2xl font-bold mb-6">Create Farmer Account</Text>

            <TextInput
                className="border rounded-lg px-4 py-3 mb-3"
                placeholder="Full Name"
                value={form.full_name}
                onChangeText={(v) => update("full_name", v)}
            />

            <TextInput
                className="border rounded-lg px-4 py-3 mb-3"
                placeholder="Email"
                autoCapitalize="none"
                value={form.email}
                onChangeText={(v) => update("email", v)}
            />

            <TextInput
                className="border rounded-lg px-4 py-3 mb-3"
                placeholder="Phone Number"
                value={form.phone_number}
                onChangeText={(v) => update("phone_number", v)}
            />

            <TextInput
                className="border rounded-lg px-4 py-3 mb-3"
                placeholder="Password"
                secureTextEntry
                value={form.password}
                onChangeText={(v) => update("password", v)}
            />

            <TextInput
                className="border rounded-lg px-4 py-3 mb-3"
                placeholder="District"
                value={form.district}
                onChangeText={(v) => update("district", v)}
            />

            <TextInput
                className="border rounded-lg px-4 py-3 mb-6"
                placeholder="State"
                value={form.state}
                onChangeText={(v) => update("state", v)}
            />
            <TextInput
                className="border rounded-lg px-4 py-3 mb-3"
                placeholder="Taluk"
                value={form.taluk}
                onChangeText={(v) => update("taluk", v)}
            />

            <TouchableOpacity
                className="bg-green-600 py-3 rounded-lg"
                onPress={submit}
                disabled={loading}
            >
                <Text className="text-white text-center font-semibold">
                    {loading ? "Creating..." : "Register"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="mt-4"
                onPress={() => navigation.navigate("Login")}
            >
                <Text className="text-center text-gray-600">
                    Already have an account? Login
                </Text>
            </TouchableOpacity>
        </View>
    );
}
