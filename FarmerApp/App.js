import "./global.css"
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import OnboardingNavigator from "./src/navigation/OnboardingNavigator";

export default function App() {
    return (
        <SafeAreaProvider>
        <NavigationContainer>
            <StatusBar style="dark" />
            <OnboardingNavigator />
        </NavigationContainer>
        </SafeAreaProvider>
    );
}

// import "./global.css";
// import { Text, View } from 'react-native';
//
// export default function App() {
//   return (
//       <View className="flex-1 items-center justify-center bg-white">
//         <Text className="text-xl  font-bold text-red-500">
//           Welcome to Nativewind!
//         </Text>
//       </View>
//   );
// }
//
