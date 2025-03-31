const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jobify API",
      version: "1.0.0",
      description: "API Documentation for Jobify",
    },
    servers: [{ url: "http://localhost:8080" }],
  },
  apis: ["./routes/*.js"], // Chỉ cần file routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
