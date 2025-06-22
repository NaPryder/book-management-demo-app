const corsOrigins = process.env?.CORS_ALLOW_ORIGINS ?? "";

export const CORS_OPTIONS = {
  origin: corsOrigins.includes(',') ? corsOrigins.split(',') : [corsOrigins],

  allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Origin',
    'X-Requested-With',
    'Accept',
    'Content-Type',
    'Authorization',
  ],
  exposedHeaders: 'Authorization',
  credentials: true,
  methods: ['GET', 'PUT', 'OPTIONS', 'POST', 'DELETE'],
};