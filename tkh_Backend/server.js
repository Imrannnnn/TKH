import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routes/auth.js';
import dataRouter from './routes/data.js';
import newsRouter from './routes/news.js';
import outreachesRouter from './routes/outreaches.js';
import metricsRouter from './routes/metrics.js';
import transparencyRouter from './routes/transparency.js';
import announcementRouter from './routes/announcement.js';
import inquiriesRouter from './routes/inquiries.js';
import connectDB from './db/db.js';

dotenv.config();
connectDB()

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend Vite development & production
app.use(
  cors({
    origin: ["*", "http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json({ limit: '10mb' }));

// Request Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/data', dataRouter);
app.use('/api/news', newsRouter);
app.use('/api/outreaches', outreachesRouter);
app.use('/api/metrics', metricsRouter);
app.use('/api/transparency', transparencyRouter);
app.use('/api/announcement', announcementRouter);
app.use('/api/inquiries', inquiriesRouter);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Ten Kind Hands Platform API',
    uptimeSeconds: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Root Route
app.get('/', (req, res) => {
  res.json({
    name: 'Ten Kind Hands API',
    version: '1.0.0',
    documentation: '/api/health',
    endpoints: [
      '/api/data',
      '/api/news',
      '/api/outreaches',
      '/api/metrics',
      '/api/transparency',
      '/api/announcement',
      '/api/inquiries',
      '/api/auth/login'
    ]
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`Ten Kind Hands Backend Server running on port ${PORT}`);
  console.log(`Base URL: http://localhost:${PORT}`);


});
