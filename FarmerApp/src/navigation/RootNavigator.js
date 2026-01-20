import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import OnboardingNavigator from "./OnboardingNavigator";
import MainNavigator from "./MainNavigator";

const RootNavigator = () => {
    const [isOnboarded, setIsOnboarded] = useState(false); // hardcoded for now
    return isOnboarded ? (
        <MainNavigator />
    ) : (
        <OnboardingNavigator setIsOnboarded={setIsOnboarded} />
    );
};

export default RootNavigator;
