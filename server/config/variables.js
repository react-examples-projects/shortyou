require("dotenv").config();

const MONGO_DB = {
  URL: process.env.MONGODB_URL,
};

const SERVER = {
  PORT: process.env.API_PORT || 6000,
  DEV: process.env.DEV || false,
  API: {
    IS_PRODUCTION: process.env.NODE_ENV === "production",
    ALLOWED_DOMAINS: [
      "http://127.0.0.1:3000",
      "http://localhost:3000",
      "http://localhost:5000",
      "http://localhost:5173",
    ],
    RATE_LIMITS: {
      windowMs: 10 * 60 * 1000, // 10 minutes
      max: 200, // limit each IP to 200 requests per windowMs
    },
  },
  CLOUDINARY: {
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  },
};

module.exports = {
  MONGO_DB,
  SERVER,
};
