import express from 'express';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Fix CORS for production
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://blogapp-frontend-3o57.onrender.com/',
    'https://*.onrender.com'
  ],
  credentials: true
}));

app.use(express.json());

// Add a test route to verify server is working
app.get('/', (req, res) => {
  res.json({ message: 'Blog API is running!' });
});

app.use('/api/blogs', blogRoutes);

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogapp';

mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB connected'))
  .catch((err: unknown) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
