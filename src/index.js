import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import referralRoutes from './routes/referral.js';
import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors(
  origin: [
   'https://accredianfrontendtask-ssl68vk0i-tirth-s-projects.vercel.app',
  'https://accredianfrontendtask-git-main-tirth-s-projects.vercel.app'
    ]

)); // Allow all origins during development
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/referrals', referralRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    }).on('error', (err) => {
      console.error('Error starting server:', err);
      process.exit(1);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
