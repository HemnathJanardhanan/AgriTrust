import { Pressable, Text } from "react-native";

export default function PrimaryButton({ title, onPress }) {
    return (
        <Pressable
            onPress={onPress}
            className="w-full bg-green-700 py-4 rounded-xl active:opacity-80"
        >
            <Text className="text-white text-center text-base font-semibold">
                {title}
            </Text>
        </Pressable>
    );
}
