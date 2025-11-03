import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import analyzeRoutes from './routes/analyze.js';
import commitRoutes from './routes/commit.js'; // New import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api', analyzeRoutes);
app.use('/api', commitRoutes); // New route

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'CodeSage API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(`🚀 CodeSage backend running on port ${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api`);
});

