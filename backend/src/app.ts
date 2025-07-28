//? Main entry 
//! Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes';
import cors from 'cors';

console.log('Starting the backend server...');

//! Initialize Express application
const app = express();

//! Middleware setup
app.use(cors()); //! Enable CORS for all routes
app.use(express.json()); //! Parse JSON bodies
app.use('/api/blogs', blogRoutes); //! Set up routes for blog operations

//! Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blogapp')
  .then(() => console.log('MongoDB connected'))
  .catch((err: unknown) => console.error(err));

//! Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));