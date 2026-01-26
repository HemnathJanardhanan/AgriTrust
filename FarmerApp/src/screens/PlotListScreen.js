import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AppContext } from "../context/AppContext";


export default function PlotListScreen({ navigation }) {
    const { context, reloadContext } = useContext(AppContext);

    const plots = context?.plot?.items || [];

    return (
        <View className="flex-1 bg-white px-6">
            <Text className="text-2xl font-bold mt-6">Your Plots</Text>

            {plots.length === 0 && (
                <Text className="text-red-600 mt-2">
                    You must add at least one plot to continue
                </Text>
            )}

            {plots.map(p => (
                <View key={p.id} className="border p-4 rounded-lg mt-4">
                    <Text className="font-semibold">{p.name}</Text>
                    <Text>{p.area_hectares} ha</Text>
                </View>
            ))}

            <TouchableOpacity
                className="bg-green-600 py-4 rounded-lg mt-6"
                onPress={() => navigation.navigate("PlotCreate")}
            >
                <Text className="text-white text-center">Add Plot</Text>
            </TouchableOpacity>

            {plots.length > 0 && (
                <TouchableOpacity
                    className="bg-black py-4 rounded-lg mt-4"
                    onPress={reloadContext}
                >
                    <Text className="text-white text-center">
                        Continue
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
