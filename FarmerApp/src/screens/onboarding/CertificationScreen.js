import { View, Text } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";

export default function CertificationScreen({ navigation }) {
    return (
        <View className="flex-1 bg-white px-6 pt-16">
            <Text className="text-2xl font-bold text-gray-900">
                Organic Certification
            </Text>

            <Text className="text-gray-500 mt-2">
                Upload your certification document
            </Text>

            <View className="mt-10 p-6 border border-dashed border-gray-400 rounded-xl">
                <Text className="text-center text-gray-600">
                    Upload feature coming next
                </Text>
            </View>

            <View className="mt-auto mb-8">
                <PrimaryButton
                    title="Finish Onboarding"
                    onPress={() => navigation.navigate("Success")}
                />
            </View>
        </View>
    );
}
