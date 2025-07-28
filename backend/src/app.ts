import express from 'express';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes';
import commentRoutes from './routes/commentRoutes';
import cors from 'cors';

console.log('Starting the backend server...');

const app = express();
const PORT = process.env.PORT || 3000; // Use Render's PORT

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogRoutes);
app.use('/api/comments', commentRoutes);

// Use environment variable for MongoDB
const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogapp';

mongoose.connect(mongoUrl)
  .then(() => console.log('MongoDB connected'))
  .catch((err: unknown) => console.error('MongoDB connection error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
