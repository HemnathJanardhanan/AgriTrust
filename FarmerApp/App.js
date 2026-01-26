import "./global.css"
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./src/navigation/RootNavigator";
import { AuthProvider } from "./src/context/AuthContext";
import {AppProvider} from "./src/context/AppContext";

export default function App() {
    return (

        <SafeAreaProvider >
            <AuthProvider>
            <AppProvider>

                <RootNavigator />

            </AppProvider>
            </AuthProvider>
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
