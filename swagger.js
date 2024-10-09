const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Book API",
    version: "1.0.0",
    description: "API documentation for the Book Management API",
  },
  servers: [
    {
      url: "http://localhost:5000", // This should be your dev server URL
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      Book: {
        type: "object",
        required: ["title", "author", "description", "price"],
        properties: {
          title: {
            type: "string",
            description: "The title of the book",
          },
          author: {
            type: "string",
            description: "The author of the book",
          },
          description: {
            type: "string",
            description: "A brief description of the book",
          },
          price: {
            type: "number",
            description: "The price of the book",
          },
        },
        example: {
          title: "Node.js Design Patterns",
          author: "Mario Casciaro",
          description: "A comprehensive guide to Node.js design patterns",
          price: 29.99,
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

// Swagger options
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // Adjust this path based on your directory structure
};

// Generate Swagger specification
const swaggerSpec = swaggerJsDoc(options);

/**
 * Sets up Swagger UI documentation
 * @param {object} app - The express application object
 */
const setupSwaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwaggerDocs;
