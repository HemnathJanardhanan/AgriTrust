import { View, Text, TextInput } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";

export default function FarmerDetailsScreen({ navigation }) {
    return (
        <View className="flex-1 bg-white px-6 pt-16">
            <Text className="text-2xl font-bold text-gray-900">
                Farmer Details
            </Text>

            <Text className="text-gray-500 mt-2">
                Tell us who you are
            </Text>

            <View className="mt-8 space-y-4">
                <TextInput
                    placeholder="Full Name"
                    className="border border-gray-300 rounded-xl px-4 py-3"
                />

                <TextInput
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                    className="border border-gray-300 rounded-xl px-4 py-3"
                />
            </View>

            <View className="mt-auto mb-8">
                <PrimaryButton
                    title="Continue"
                    onPress={() => navigation.navigate("AddFarm")}
                />
            </View>
        </View>
    );
}
