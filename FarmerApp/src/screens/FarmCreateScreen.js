import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { AppContext } from "../context/AppContext";
import api from "../api/client";
export default function FarmCreateScreen() {
    const [name, setName] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const { reloadContext } = useContext(AppContext);

    async function handleSubmit() {
        if (!name.trim()) {
            Alert.alert("Validation", "Farm name is required");
            return;
        }

        try {
            setSubmitting(true);
            await api.post("/farms",{ name });
            await reloadContext(); // 🔥 THIS is the key
        } catch (err) {
            Alert.alert(
                "Error",
                err.response?.data?.error || "Failed to create farm"
            );
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <View className="flex-1 bg-white px-6 justify-center">
            <Text className="text-2xl font-bold mb-2">Create your Farm</Text>
            <Text className="text-gray-500 mb-6">
                Give your farm a name to get started
            </Text>

            <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
                placeholder="Farm name"
                value={name}
                onChangeText={setName}
            />

            <TouchableOpacity
                className={`rounded-lg py-4 ${
                    submitting ? "bg-gray-400" : "bg-green-600"
                }`}
                onPress={handleSubmit}
                disabled={submitting}
            >
                <Text className="text-white text-center font-semibold">
                    {submitting ? "Creating..." : "Create Farm"}
                </Text>
            </TouchableOpacity>
        </View>
    );
}
