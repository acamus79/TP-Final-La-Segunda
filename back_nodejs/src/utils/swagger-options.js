const port = process.env.PORT || 4000;

module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API BackEnd - ARAK Vehicle Management",
      version: "0.0.1",
      description: "API Documentation for vehicle management ARAK",
    },
    servers: [
      {
        url: `http://localhost:${port}/api`,
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
