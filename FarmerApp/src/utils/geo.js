// Convert array of { latitude, longitude } to GeoJSON Polygon
export function latLngsToGeoJSONPolygon(points) {
    if (points.length < 3) {
        throw new Error("Polygon requires at least 3 points");
    }

    const coordinates = points.map(p => [p.longitude, p.latitude]);

    // Close the ring
    coordinates.push(coordinates[0]);

    return {
        type: "Polygon",
        coordinates: [coordinates]
    };
}
