export function geoJSONToPostGIS(geojson) {
    return {
        type: "MultiPolygon",
        coordinates: geojson.coordinates,
        crs: { type: "name", properties: { name: "EPSG:4326" } },
    };
}
