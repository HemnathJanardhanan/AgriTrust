import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FarmerDetailsScreen from "../screens/onboarding/FarmerDetailsScreen";
import AddFarmScreen from "../screens/onboarding/AddFarmScreen";
import CertificationScreen from "../screens/onboarding/CertificationScreen";
import OnboardingSuccessScreen from "../screens/onboarding/OnboardingSuccessScreen";

const Stack = createNativeStackNavigator();

const OnboardingNavigator = ({ setIsOnboarded }) => (
    <Stack.Navigator initialRouteName="FarmerDetails" screenOptions={{
        headerShown: false,
    }}>
        <Stack.Screen name="FarmerDetails" component={FarmerDetailsScreen} />
        <Stack.Screen name="AddFarm" component={AddFarmScreen} />
        <Stack.Screen name="Certification" component={CertificationScreen} />
        <Stack.Screen
            name="Success"
            component={OnboardingSuccessScreen}
            initialParams={{ setIsOnboarded }}
        />
    </Stack.Navigator>
);

export default OnboardingNavigator;
