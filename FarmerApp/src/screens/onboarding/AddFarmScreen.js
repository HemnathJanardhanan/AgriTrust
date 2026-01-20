import { View, Text, TextInput } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";

export default function AddFarmScreen({ navigation }) {
    return (
        <View className="flex-1 bg-white px-6 pt-16">
            <Text className="text-2xl font-bold text-gray-900">
                Farm Details
            </Text>

            <Text className="text-gray-500 mt-2">
                Add your primary farm
            </Text>

            <View className="mt-8 space-y-4">
                <TextInput
                    placeholder="Farm Name"
                    className="border border-gray-300 rounded-xl px-4 py-3"
                />

                <TextInput
                    placeholder="Village / Location"
                    className="border border-gray-300 rounded-xl px-4 py-3"
                />
            </View>

            <View className="mt-auto mb-8">
                <PrimaryButton
                    title="Next"
                    onPress={() => navigation.navigate("Certification")}
                />
            </View>
        </View>
    );
}
