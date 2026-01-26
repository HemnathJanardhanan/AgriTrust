import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function SoilTypeSelector({ options, value, onChange }) {
    return (
        <View className="mb-4">
            <Text className="font-semibold mb-2">Soil Type</Text>

            {options.map(soil => {
                const selected = value === soil.id;

                return (
                    <TouchableOpacity
                        key={soil.id}
                        onPress={() => onChange(soil.id)}
                        className={`p-3 rounded-lg mb-2 border ${
                            selected ? "border-green-600 bg-green-50" : "border-gray-300"
                        }`}
                    >
                        <Text className="font-medium">{soil.name}</Text>
                        {soil.description && (
                            <Text className="text-gray-500 text-sm">
                                {soil.description}
                            </Text>
                        )}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
