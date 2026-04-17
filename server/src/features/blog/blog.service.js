import mongoose from "mongoose";
import { Blog } from "./blog.model.js";
import { User } from "../auth/auth.model.js";

function buildSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function generateUniqueSlug(title, excludeId) {
  const baseSlug = buildSlug(title) || "untitled-blog";
  let slug = baseSlug;
  let suffix = 1;

  while (true) {
    const existingBlog = await Blog.findOne({
      slug,
      ...(excludeId ? { _id: { $ne: excludeId } } : {}),
    });

    if (!existingBlog) {
      return slug;
    }

    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }
}

function normalizeTags(tags) {
  if (!tags) {
    return [];
  }

  if (Array.isArray(tags)) {
    return tags
      .map((tag) => (typeof tag === "string" ? tag.trim() : ""))
      .filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

function buildExcerpt(excerpt, content) {
  if (typeof excerpt === "string" && excerpt.trim()) {
    return excerpt.trim();
  }

  return content.trim().slice(0, 180);
}

function buildBlogPayload(data) {
  return {
    title: data.title.trim(),
    excerpt: buildExcerpt(data.excerpt, data.content),
    content: data.content.trim(),
    tags: normalizeTags(data.tags),
    coverImage: typeof data.coverImage === "string" ? data.coverImage.trim() : "",
  };
}

function isValidObjectId(value) {
  return mongoose.Types.ObjectId.isValid(value);
}

export async function createBlog(data, userId) {
  const blogPayload = buildBlogPayload(data);
  const slug = await generateUniqueSlug(blogPayload.title);
  const author = await User.findById(userId).select("name email");

  if (!author) {
    throw new Error("Author not found");
  }

  const blog = await Blog.create({
    ...blogPayload,
    slug,
    author: {
      id: author._id,
      name: author.name,
      email: author.email,
    },
  });

  return blog;
}

export async function listBlogs() {
  return Blog.find({}).sort({ createdAt: -1 });
}

export async function getBlogByIdOrSlug(identifier) {
  if (!identifier || typeof identifier !== "string") {
    return null;
  }

  if (isValidObjectId(identifier)) {
    const blog = await Blog.findById(identifier);

    if (blog) {
      return blog;
    }
  }

  return Blog.findOne({ slug: identifier.toLowerCase() });
}

function isOwner(blog, userId) {
  return Boolean(blog?.author?.id && userId && blog.author.id.toString() === userId);
}

export async function updateBlog(identifier, data, userId) {
  const blog = await getBlogByIdOrSlug(identifier);

  if (!blog) {
    return null;
  }

  if (!isOwner(blog, userId)) {
    throw new Error("Forbidden");
  }

  const currentTitle = blog.title;

  const nextPayload = buildBlogPayload({
    title: data.title ?? blog.title,
    excerpt: data.excerpt ?? blog.excerpt,
    content: data.content ?? blog.content,
    tags: data.tags ?? blog.tags,
    coverImage: data.coverImage ?? blog.coverImage,
  });

  blog.title = nextPayload.title;
  blog.excerpt = nextPayload.excerpt;
  blog.content = nextPayload.content;
  blog.tags = nextPayload.tags;
  blog.coverImage = nextPayload.coverImage;

  if (nextPayload.title !== currentTitle || !blog.slug) {
    blog.slug = await generateUniqueSlug(nextPayload.title, blog._id);
  }

  await blog.save();

  return blog;
}

export async function deleteBlog(identifier, userId) {
  const blog = await getBlogByIdOrSlug(identifier);

  if (!blog) {
    return null;
  }

  if (!isOwner(blog, userId)) {
    throw new Error("Forbidden");
  }

  await blog.deleteOne();

  return blog;
}
