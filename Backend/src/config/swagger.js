import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Organic Farm Certification API",
            version: "1.0.0",
            description: "Authority & Farmer workflow APIs",
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local dev",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },

    apis: [
        "./src/modules/**/*.routes.js",
        "./src/modules/**/*.controller.js",
    ],
};

export const swaggerSpec = swaggerJSDoc(options);
