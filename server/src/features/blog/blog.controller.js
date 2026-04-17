import {
  createBlog,
  deleteBlog,
  getBlogByIdOrSlug,
  listBlogs,
  updateBlog,
} from "./blog.service.js";

function validateCreatePayload({ title, content }) {
  if (!title || typeof title !== "string" || !title.trim()) {
    return "Title is required";
  }

  if (!content || typeof content !== "string" || !content.trim()) {
    return "Content is required";
  }

  return null;
}

function validateUpdatePayload(body) {
  if (!body || Object.keys(body).length === 0) {
    return "At least one field is required to update";
  }

  if ("title" in body && (!body.title || typeof body.title !== "string" || !body.title.trim())) {
    return "Title is required";
  }

  if (
    "content" in body &&
    (!body.content || typeof body.content !== "string" || !body.content.trim())
  ) {
    return "Content is required";
  }

  return null;
}

export async function create(req, res, next) {
  try {
    const errorMessage = validateCreatePayload(req.body || {});

    if (errorMessage) {
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    const blog = await createBlog(req.body, req.user.id);

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    if (error.message === "Author not found") {
      return res.status(401).json({
        success: false,
        message: "Author not found",
      });
    }

    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A blog with this slug already exists",
      });
    }

    next(error);
  }
}

export async function list(_req, res, next) {
  try {
    const blogs = await listBlogs();

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
  } catch (error) {
    next(error);
  }
}

export async function getByIdOrSlug(req, res, next) {
  try {
    const blog = await getBlogByIdOrSlug(req.params.blogIdOrSlug);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    next(error);
  }
}

export async function update(req, res, next) {
  try {
    const errorMessage = validateUpdatePayload(req.body || {});

    if (errorMessage) {
      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    const blog = await updateBlog(req.params.blogIdOrSlug, req.body, req.user.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    if (error.message === "Forbidden") {
      return res.status(403).json({
        success: false,
        message: "You can only edit your own blogs",
      });
    }

    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A blog with this slug already exists",
      });
    }

    next(error);
  }
}

export async function remove(req, res, next) {
  try {
    const blog = await deleteBlog(req.params.blogIdOrSlug, req.user.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      blog,
    });
  } catch (error) {
    if (error.message === "Forbidden") {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own blogs",
      });
    }

    next(error);
  }
}
