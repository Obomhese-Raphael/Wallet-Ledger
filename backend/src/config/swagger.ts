import path from "path";
import { fileURLToPath } from "url";
import swaggerJsdoc from "swagger-jsdoc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Wallet Ledger API",
      version: "1.0.0",
      description:
        "A Ledger-Based Digital Wallet API built with Node.js, Express, TypeScript and MongoDB.",
    },

    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Development Server",
      },
      {
        url: "https://wallet-ledger-api-8icr.onrender.com/api/v1",
        description: "Production Server",
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

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [path.join(__dirname, "../docs/*.js")],
};

export const swaggerSpec = swaggerJsdoc(options);
