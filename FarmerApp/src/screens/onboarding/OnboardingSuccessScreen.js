import { View, Text } from "react-native";
import PrimaryButton from "../../components/PrimaryButton";

export default function OnboardingSuccessScreen({ route }) {
    const { setIsOnboarded } = route.params;


    return (
        <View className="flex-1 bg-green-700 items-center justify-center px-6">
            <Text className="text-white text-3xl font-bold text-center">
                Onboarding Complete
            </Text>

            <Text className="text-green-100 mt-4 text-center">
                Your farmer profile has been created successfully
            </Text>

            <View className="w-full mt-10">
                <PrimaryButton title="Go to Dashboard" onPress={() => {}} />
            </View>
        </View>
    );
}
