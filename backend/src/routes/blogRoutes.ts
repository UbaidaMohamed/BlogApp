import express from 'express';
import Blog from '../models/Blog'; // Add this import for the test route
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  getBlogById, // Add this - you're missing it
  updateBlog,
  deleteBlog
} from '../controllers/blogControllers';

const router = express.Router();

// Test route to check database connection
router.get('/test', async (req, res) => {
  try {
    const count = await Blog.countDocuments();
    const blogs = await Blog.find().limit(5);
    res.json({ 
      message: 'Database connected successfully', 
      totalBlogs: count,
      sampleBlogs: blogs 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Database connection failed', 
      error: (error as Error).message 
    });
  }
});

// Blog CRUD routes
router.post('/', createBlog);
router.get('/', getAllBlogs);
router.get('/slug/:slug', getBlogBySlug); // Add /slug/ prefix to avoid conflicts
router.get('/:id', getBlogById); // For editing - get by ID
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;