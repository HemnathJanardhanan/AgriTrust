// import { z } from "zod";
//
// const coordinate = z.tuple([
//     z.number().min(-180).max(180),
//     z.number().min(-90).max(90),
// ]);
//
// const linearRing = z.array(coordinate).min(4);
//
// export const farmCreateSchema = z.object({
//     name: z.string().min(3).max(150),
//     boundary: z.object({
//         type: z.literal("MultiPolygon"),
//         coordinates: z.array(
//             z.array(
//                 z.array(linearRing)
//             )
//         ),
//     }),
// });
import { z } from "zod";

/**
 * A single coordinate: [lng, lat]
 */
const coordinate = z.tuple([
    z.number(),
    z.number(),
]);

/**
 * Linear Ring:
 * - array of coordinates
 * - at least 4 points
 * - first == last (optional check later)
 */
const linearRing = z.array(coordinate).min(4);

/**
 * Polygon = array of rings
 */
const polygon = z.array(linearRing).min(1);

/**
 * MultiPolygon = array of polygons
 */
const multiPolygon = z.array(polygon).min(1);

export const farmCreateSchema = z.object({
    name: z.string().min(3),
    // boundary: z.object({
    //     type: z.literal("MultiPolygon"),
    //     coordinates: multiPolygon,
    // }),
});
