import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: [String],
    coverImage: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const blogModel = mongoose.models.blog || mongoose.model('blog', blogSchema);
export default blogModel;