import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      default: "",
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    coverImage: {
      type: String,
      default: "",
      trim: true,
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      name: {
        type: String,
        default: "",
        trim: true,
      },
      email: {
        type: String,
        default: "",
        trim: true,
        lowercase: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

blogSchema.index({ slug: 1 }, { unique: true });

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
