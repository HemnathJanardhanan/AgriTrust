import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, Dimensions } from "react-native";
import MapView, { Polygon, Marker } from "react-native-maps";
import { AppContext } from "../context/AppContext";
import { createPlot } from "../api/plot";
import { latLngsToGeoJSONPolygon } from "../utils/geo";
import SoilTypeSelector from "../components/SoilTypeSelector";
import IrrigationSelector from "../components/IrrigationSelector";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import {calculateAreaHectares} from "../utils/calculateArea";
const { width, height } = Dimensions.get("window");

export default function PlotCreateScreen() {
    const { context, reloadContext } = useContext(AppContext);

    const farmId = context?.farm?.id;
    const reference = context?.reference;

    const [name, setName] = useState("");

    const [points, setPoints] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [soilTypeId, setSoilTypeId] = useState(null);
    const [irrigationMethod, setIrrigationMethod] = useState(null);

    // ⛔ Guard until reference data is ready
    if (!reference) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Loading...</Text>
            </View>
        );
    }

    function handleMapPress(e) {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setPoints(prev => [...prev, { latitude, longitude }]);
    }

    function resetPolygon() {
        setPoints([]);
    }

    async function handleSubmit() {

        if (!farmId) {
            Alert.alert("Error", "Farm not found. Please reload.");
            return;
        }

        if (!name || points.length < 3) {
            Alert.alert("Validation", "Fill all fields and draw a plot boundary");
            return;
        }

        if (!soilTypeId) {
            Alert.alert("Validation", "Please select soil type");
            return;
        }

        if (!irrigationMethod) {
            Alert.alert("Validation", "Select a irrigation method");
            return;
        }

        try {
            setSubmitting(true);

            // ✅ Ensure polygon is closed
            const closedPoints =
                points[0].latitude === points[points.length - 1].latitude &&
                points[0].longitude === points[points.length - 1].longitude
                    ? points
                    : [...points, points[0]];

            const boundary = latLngsToGeoJSONPolygon(closedPoints);
            console.log("boundary", boundary);
            const payload = {
                name,
                area_hectares: areaHectares,
                soil_type_id: soilTypeId, // ✅ use selected value
                irrigation_methods: [{"id":irrigationMethod,"is_primary":true}],
                boundary,
            };
            console.log("Create Plot Payload : ",payload);
            await createPlot({ farmId, payload });
            await reloadContext();
        } catch (err) {
            console.log("Plot Creation Error : ",err);
            Alert.alert(
                "Error",
                err.response?.data?.error || err.message || "Failed to create plot"
            );
        } finally {
            setSubmitting(false);
        }
    }
    const areaHectares =
        points.length >= 3 ? calculateAreaHectares(points) : 0;

    return (
        <SafeAreaView edges={["top"]} className="flex-1 bg-white">
            {/* Header */}
            <View className="px-4 py-3 border-b border-gray-200">
                <Text className="text-2xl font-bold">Add Plot</Text>
                <Text className="text-gray-500">Tap on map to draw boundary</Text>
            </View>

            {/* Map */}
            <MapView
                style={{ height: height * 0.45 }}
                initialRegion={{
                    latitude: 13.1235,
                    longitude: 80.1235,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                onPress={handleMapPress}
            >
                {points.map((p, idx) => (
                    <Marker key={idx} coordinate={p} />
                ))}

                {points.length >= 3 && (
                    <Polygon
                        coordinates={points}
                        fillColor="rgba(34,197,94,0.3)"
                        strokeColor="rgba(22,163,74,1)"
                        strokeWidth={2}
                    />
                )}
                <View
                    style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        backgroundColor: "rgba(0,0,0,0.6)",
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 8,
                    }}
                >
                    <Text style={{ color: "white", fontSize: 12 }}>
                        Tap on map to draw boundary
                    </Text>
                </View>
            </MapView>

            {/* Form */}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ padding: 16 }}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
            <View className="p-4 border-t border-gray-200">
                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 mb-2"
                    placeholder="Plot name"
                    value={name}
                    onChangeText={setName}
                />

                {/*<TextInput*/}
                {/*    className="border border-gray-300 rounded-lg px-4 py-3 mb-3"*/}
                {/*    placeholder="Area (hectares)"*/}
                {/*    keyboardType="decimal-pad"*/}
                {/*    value={area}*/}
                {/*    onChangeText={setArea}*/}
                {/*/>*/}

                <SoilTypeSelector
                    options={reference.soil_types}
                    value={soilTypeId}
                    onChange={setSoilTypeId}
                />

                <IrrigationSelector
                    options={reference.irrigation_methods}
                    value={irrigationMethod}
                    onChange={setIrrigationMethod}
                />

                <View className="flex-row justify-between mb-3">
                    <TouchableOpacity
                        className="px-4 py-2 rounded-lg bg-gray-200"
                        onPress={resetPolygon}
                    >
                        <Text>Reset Boundary</Text>
                    </TouchableOpacity>

                    <Text className="text-gray-500">
                        Points: {points.length}
                    </Text>
                    <Text className="text-gray-700 mb-2">
                        Area: {areaHectares.toFixed(2)} hectares
                    </Text>

                </View>

                <TouchableOpacity
                    className={`rounded-lg py-4 ${
                        submitting ? "bg-gray-400" : "bg-green-600"
                    }`}
                    onPress={handleSubmit}
                    disabled={submitting}
                >
                    <Text className="text-white text-center font-semibold">
                        {submitting ? "Saving..." : "Save Plot"}
                    </Text>
                </TouchableOpacity>
            </View>
                    </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

//
// export default function PlotCreateScreen() {
//     const { context, reloadContext } = useContext(AppContext);
//     const farmId = context?.farm?.id;
//
//     const [name, setName] = useState("");
//     const [area, setArea] = useState("");
//     const [points, setPoints] = useState([]);
//     const [submitting, setSubmitting] = useState(false);
//     const [soilTypeId, setSoilTypeId] = useState(null);
//     const [irrigationMethods, setIrrigationMethods] = useState([]);
//
//     function handleMapPress(e) {
//         const { latitude, longitude } = e.nativeEvent.coordinate;
//         setPoints(prev => [...prev, { latitude, longitude }]);
//     }
//
//     function resetPolygon() {
//         setPoints([]);
//     }
//
//     async function handleSubmit() {
//         if (!name || !area || points.length < 3) {
//             Alert.alert("Validation", "Fill all fields and draw a plot boundary");
//             return;
//         }
//         if (!soilTypeId) {
//             Alert.alert("Validation", "Please select soil type");
//             return;
//         }
//
//         if (irrigationMethods.length === 0) {
//             Alert.alert("Validation", "Select at least one irrigation method");
//             return;
//         }
//
//         if (!irrigationMethods.some(m => m.is_primary)) {
//             Alert.alert("Validation", "Select a primary irrigation method");
//             return;
//         }
//
//
//         try {
//             setSubmitting(true);
//
//             const boundary = latLngsToGeoJSONPolygon(points);
//
//             const payload = {
//                 name,
//                 area_hectares: Number(area),
//                 soil_type_id: context.reference.soil_types[0].id, // temp: first option
//                 irrigation_methods: [
//                     {
//                         id: context.reference.irrigation_methods[0].id,
//                         is_primary: true
//                     }
//                 ],
//                 boundary
//             };
//
//             await createPlot({ farmId, payload });
//             await reloadContext();
//         } catch (err) {
//             Alert.alert(
//                 "Error",
//                 err.response?.data?.error || err.message || "Failed to create plot"
//             );
//         } finally {
//             setSubmitting(false);
//         }
//     }
//
//     return (
//         <View className="flex-1 bg-white">
//             {/* Header */}
//             <View className="px-4 py-3 border-b border-gray-200">
//                 <Text className="text-xl font-bold">Add Plot</Text>
//                 <Text className="text-gray-500">Tap on map to draw boundary</Text>
//             </View>
//
//             {/* Map */}
//             <MapView
//                 className="flex-1"
//                 initialRegion={{
//                     latitude: 13.1235,
//                     longitude: 80.1235,
//                     latitudeDelta: 0.01,
//                     longitudeDelta: 0.01
//                 }}
//                 onPress={handleMapPress}
//             >
//                 {points.map((p, idx) => (
//                     <Marker key={idx} coordinate={p} />
//                 ))}
//
//                 {points.length >= 3 && (
//                     <Polygon
//                         coordinates={points}
//                         fillColor="rgba(34,197,94,0.3)"
//                         strokeColor="rgba(22,163,74,1)"
//                         strokeWidth={2}
//                     />
//                 )}
//             </MapView>
//
//             {/* Form */}
//             <View className="p-4 border-t border-gray-200">
//                 <TextInput
//                     className="border border-gray-300 rounded-lg px-4 py-3 mb-2"
//                     placeholder="Plot name"
//                     value={name}
//                     onChangeText={setName}
//                 />
//
//                 <TextInput
//                     className="border border-gray-300 rounded-lg px-4 py-3 mb-3"
//                     placeholder="Area (hectares)"
//                     keyboardType="decimal-pad"
//                     value={area}
//                     onChangeText={setArea}
//                 />
//
//                 <SoilTypeSelector
//                     options={context.reference.soil_types}
//                     value={soilTypeId}
//                     onChange={setSoilTypeId}
//                 />
//
//                 <IrrigationSelector
//                     options={context.reference.irrigation_methods}
//                     value={irrigationMethods}
//                     onChange={setIrrigationMethods}
//                 />
//
//
//                 <View className="flex-row justify-between mb-3">
//                     <TouchableOpacity
//                         className="px-4 py-2 rounded-lg bg-gray-200"
//                         onPress={resetPolygon}
//                     >
//                         <Text>Reset Boundary</Text>
//                     </TouchableOpacity>
//
//                     <Text className="text-gray-500">
//                         Points: {points.length}
//                     </Text>
//                 </View>
//
//                 <TouchableOpacity
//                     className={`rounded-lg py-4 ${
//                         submitting ? "bg-gray-400" : "bg-green-600"
//                     }`}
//                     onPress={handleSubmit}
//                     disabled={submitting}
//                 >
//                     <Text className="text-white text-center font-semibold">
//                         {submitting ? "Saving..." : "Save Plot"}
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }
