import mongoose, { Document } from 'mongoose';

//! TypeScript interface (Defines what fields a blog post has)
export interface IBlog extends Document {
  title: string;
  slug: string;
  description: string;
  status: 'active' | 'deleted';
  createdAt: Date;
  updatedAt: Date;
}

//! Mongoose schema (Defines the structure of the blog post in the database)
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['active', 'deleted'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
  collection: 'schemas'
});

//! Export the model (This allows us to use the blog model in other parts of the application)
export default mongoose.model<IBlog>('Blog', blogSchema);