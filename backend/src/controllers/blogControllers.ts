import { Request, Response } from 'express';
import Blog from '../models/Blog';

// Get all blogs (only active)
export const getAllBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Fetching blogs from database...');
    const blogs = await Blog.find({ status: 'active' }).sort({ createdAt: -1 });
    console.log('Found blogs:', blogs.length);
    console.log('Blogs data:', blogs);
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

// Get single blog by slug
export const getBlogBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: 'active' });
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error });
  }
};

// Get single blog by ID (for editing)
export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blog', error });
  }
};

// Create new blog
export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, slug, description, content } = req.body;
    
    console.log('Creating blog with data:', { title, slug, description, content });
    
    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      res.status(400).json({ message: 'Slug already exists' });
      return;
    }

    const blog = new Blog({
      title,
      slug,
      description: description || content, // Handle both field names
      status: 'active'
    });

    const savedBlog = await blog.save();
    console.log('Blog created successfully:', savedBlog);
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Error creating blog', error });
  }
};

// Update blog
export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, content } = req.body;
    
    console.log('Updating blog with data:', { title, description, content });
    
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        description: description || content // Handle both field names
      },
      { new: true, runValidators: true }
    );

    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    console.log('Blog updated successfully:', blog);
    res.json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Error updating blog', error });
  }
};

// Delete blog (soft delete)
export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { status: 'deleted' },
      { new: true }
    );

    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    console.log('Blog deleted successfully:', blog._id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Error deleting blog', error });
  }
};