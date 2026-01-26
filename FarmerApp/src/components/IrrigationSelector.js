import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function IrrigationSelector({ options, value, onChange }) {
    return (
        <View className="mb-4">
            <Text className="font-semibold mb-2">Irrigation Method</Text>

            {options.map(irrigation => {
                const selected = value === irrigation.id;

                return (
                    <TouchableOpacity
                        key={irrigation.id}
                        onPress={() => onChange(irrigation.id)}
                        className={`p-3 rounded-lg mb-2 border ${
                            selected ? "border-green-600 bg-green-50" : "border-gray-300"
                        }`}
                    >
                        <Text className="font-medium">{irrigation.name}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
