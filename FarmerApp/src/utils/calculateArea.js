import * as turf from "@turf/turf";

export function calculateAreaHectares(points) {
    const closed =
        points[0].latitude === points[points.length - 1].latitude &&
        points[0].longitude === points[points.length - 1].longitude
            ? points
            : [...points, points[0]];

    const polygon = turf.polygon([closed.map(p => [p.longitude, p.latitude])]);
    const areaSqMeters = turf.area(polygon);

    return areaSqMeters / 10_000; // hectares
}
