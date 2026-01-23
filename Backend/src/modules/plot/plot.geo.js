export function polygonToWKT(polygon) {
    if (polygon.type !== "Polygon") {
        throw new Error("Only Polygon supported for plot boundary");
    }

    const ring = polygon.coordinates[0];

    const points = ring
        .map(([lng, lat]) => `${lng} ${lat}`)
        .join(", ");

    return `POLYGON((${points}))`;
}
