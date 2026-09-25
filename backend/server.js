import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import contactRoutes from './routes/contact.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ================================
// VERCEL / REVERSE PROXY
// ================================
// Trust Vercel's reverse proxy so
// express-rate-limit can correctly
// determine the client IP.
app.set('trust proxy', 1);

// ================================
// CORS
// ================================
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin
      // such as Postman, curl, mobile apps, etc.
      if (!origin) {
        return callback(null, true);
      }

      // Allow configured origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow all origins temporarily
      // This can be restricted after deployment.
      return callback(null, true);
    },
    credentials: true,
  })
);

// ================================
// BODY PARSERS
// ================================
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ================================
// RATE LIMITER
// ================================
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      'Too many contact requests from this IP. Please try again after 15 minutes.',
  },
});

// ================================
// HEALTH CHECK
// ================================
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ================================
// CONTACT ROUTES
// ================================
app.use('/api/contact', contactLimiter, contactRoutes);

// ================================
// 404 HANDLER
// ================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found',
  });
});

// ================================
// ERROR HANDLER
// ================================
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
});

// ================================
// LOCAL SERVER
// ================================
// Vercel handles the server in production.
// We only start app.listen() locally.
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(
      `🚀 Portfolio backend server running on http://localhost:${PORT}`
    );
  });
}

// ================================
// EXPORT EXPRESS APP FOR VERCEL
// ================================
export default app;