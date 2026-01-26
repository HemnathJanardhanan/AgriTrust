import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppContext } from "../context/AppContext";
import FarmCreateScreen from "../screens/FarmCreateScreen";
import PlotListScreen from "../screens/PlotListScreen";
import PlotCreateScreen from "../screens/PlotCreateScreen";

const Stack = createNativeStackNavigator();

export default function FarmerOnboardingNavigator() {
    const { context } = useContext(AppContext);

    const state = context?.onboarding_state;

    return (

        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {state === "FARMER_PROFILE_CREATED" && (
                <Stack.Screen
                    name="FarmCreate"
                    component={FarmCreateScreen}
                />
            )}

            {state === "FARM_CREATED" && (
                <>
                    <Stack.Screen
                        name="PlotList"
                        component={PlotListScreen}
                    />
                    <Stack.Screen
                        name="PlotCreate"
                        component={PlotCreateScreen}
                    />
                </>
            )}
        </Stack.Navigator>
    );
}
