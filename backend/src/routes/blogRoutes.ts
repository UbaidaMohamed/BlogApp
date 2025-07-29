import express, { Request, Response } from 'express';
import Blog from '../models/Blog';
import {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  getBlogById,
  updateBlog,
  deleteBlog
} from '../controllers/blogControllers';

const router = express.Router();

// Test route with proper typing
router.get('/test', async (req: Request, res: Response) => {
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
router.get('/slug/:slug', getBlogBySlug);
router.get('/:id', getBlogById);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
