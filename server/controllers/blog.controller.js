import blogModel from "../models/blog.model.js";

export const postBlog = async (req, res) => {
    try {
        const { title, content, tag, coverimage } = req.body;

        // 1. Validation
        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: "Title and Content are required."
            });
        }

        // 2. Create document (No author field here)
        const newBlog = new blogModel({
            title,
            content,
            tags: tag ? [tag] : [], 
            coverImage: coverimage
        });

        // 3. Save to Database
        await newBlog.save();

        return res.status(201).json({
            success: true,
            message: "Blog created successfully!",
            blog: newBlog
        });

    } catch (error) {
        console.error("Blog Creation Error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Fetch all blog posts
export const getPosts = async (req, res) => {
    try {
        // .find({}) gets everything in the collection
        // .sort({ createdAt: -1 }) puts the newest blogs at the top
        const blogs = await blogModel.find({}).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: blogs.length,
            blogs: blogs
        });

    } catch (error) {
        console.error("Error fetching blogs:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch blogs. Please try again later."
        });
    }
};