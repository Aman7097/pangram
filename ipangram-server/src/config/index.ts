import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000", 10),
  mongodb: {
    uri:
      process.env.MONGODB_URI ||
      "mongodb://localhost:27017/employee-management",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || "your-secret-key",
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  logs: {
    level: process.env.LOG_LEVEL || "info",
  },
};

export default config;
