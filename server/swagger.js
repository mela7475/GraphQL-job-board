import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
openapi: "3.0.0",
info: {
title: "Node JS GraphQL",
version: "1.0.0",
description: "This is a test of using swagger UI with Node.js",
},
};

const options = {
swaggerDefinition,
apis: ["health.js", "./routes/*.js", "./routes/*/*.js"], // Path to the API routes in your Node.js application
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;