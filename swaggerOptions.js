const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "wisdocity-api",
      version: "1.0.0",
      description: "Description of your API",
    },
  },
  apis: ["./services/swager.js"],
};

module.exports = swaggerOptions;
