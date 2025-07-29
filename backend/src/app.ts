import express from 'express';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 10000;

// Fix CORS to allow your frontend domain
app.use(cors({
  origin: [
    'http://localhost:5173', // Local development
    'https://blogapp-frontend-3o57.onrender.com', // Your frontend URL
    'https://*.onrender.com' // Allow all Render subdomains
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running!', status: 'healthy' });
});

app.use('/api/blogs', blogRoutes);

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogapp';

mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
