import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import { AppContext } from "../context/AppContext";

import OnboardingNavigator from "./OnboardingNavigator";
import FarmerOnboardingNavigator from "./FarmerOnboardingNavigator";
import MainNavigator from "./MainNavigator";

import { View, ActivityIndicator } from "react-native";

export default function RootNavigator() {
    const { token, loading: authLoading } = useContext(AuthContext);
    const { context, loading: appLoading } = useContext(AppContext);

    if (authLoading || (token && appLoading)) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!token) {
        return (
            <NavigationContainer>
                <OnboardingNavigator />
            </NavigationContainer>
        );
    }

    switch (context?.onboarding_state) {
        case "FARMER_PROFILE_CREATED":
        case "FARM_CREATED":
            return (
                <NavigationContainer>
                    <FarmerOnboardingNavigator />
                </NavigationContainer>
            );

        case "ONBOARDED":
            return (
                <NavigationContainer>
                    <MainNavigator />
                </NavigationContainer>
            );

        default:
            return (
                <NavigationContainer>
                    <OnboardingNavigator />
                </NavigationContainer>
            );
    }
}
