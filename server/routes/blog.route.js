import { Router } from 'express';
import { postBlog, getPosts } from '../controllers/blog.controller.js';

const blogRoutes = Router();

// Endpoint: POST /api/blog/post
blogRoutes.post('/post', postBlog);

// Endpoint: GET /api/blog/all
blogRoutes.get('/all', getPosts);

export default blogRoutes;