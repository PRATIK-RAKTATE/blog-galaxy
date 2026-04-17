import { useEffect, useState } from "react";
import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BlogShell } from "./BlogShell";
import { Button } from "../../components/ui/Button";
import { deleteBlogRequest, getBlogRequest } from "../../lib/api";

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function BlogDetailPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { blogIdOrSlug } = useParams();
  const [blog, setBlog] = useState(null);
  const [status, setStatus] = useState({ loading: true, deleting: false, error: "" });
  const isOwner = Boolean(blog?.author?.id && user?.id && blog.author.id === user.id);

  useEffect(() => {
    let active = true;

    async function loadBlog() {
      try {
        setStatus({ loading: true, deleting: false, error: "" });
        const result = await getBlogRequest(blogIdOrSlug);

        if (!active) {
          return;
        }

        setBlog(result.blog);
        setStatus({ loading: false, deleting: false, error: "" });
      } catch (error) {
        if (!active) {
          return;
        }

        setStatus({
          loading: false,
          deleting: false,
          error: error.message || "Failed to load blog",
        });
      }
    }

    loadBlog();

    return () => {
      active = false;
    };
  }, [blogIdOrSlug]);

  async function handleDelete() {
    if (!blog) {
      return;
    }

    const confirmed = window.confirm(`Delete "${blog.title}"?`);

    if (!confirmed) {
      return;
    }

    try {
      setStatus((current) => ({ ...current, deleting: true, error: "" }));
      await deleteBlogRequest(blog.slug || blog._id);
      navigate("/blogs");
    } catch (error) {
      setStatus((current) => ({
        ...current,
        deleting: false,
        error: error.message || "Failed to delete blog",
      }));
    }
  }

  return (
    <BlogShell
      title={blog?.title || "Blog detail"}
      description="Inspect the full post payload returned by the API, then jump into edit or delete operations without leaving the frontend workspace."
      actions={
        blog && isOwner ? (
          <>
            <Button as={Link} to={`/blogs/${blog.slug}/edit`} variant="secondary" className="rounded-full">
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleDelete}
              disabled={status.deleting}
              className="rounded-full border border-red-400/25 bg-red-400/8 text-red-100 hover:text-red-50"
            >
              <Trash2 className="h-4 w-4" />
              {status.deleting ? "Deleting..." : "Delete"}
            </Button>
          </>
        ) : null
      }
    >
      {status.loading ? (
        <div className="rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-8 shadow-[var(--shadow-glow)] backdrop-blur-xl">
          <p className="text-sm text-white/60">Loading blog post...</p>
        </div>
      ) : null}

      {!status.loading && status.error ? (
        <div className="rounded-[var(--radius-card)] border border-red-400/25 bg-red-400/8 p-8 shadow-[var(--shadow-glow)] backdrop-blur-xl">
          <p className="text-sm text-red-200">{status.error}</p>
        </div>
      ) : null}

      {!status.loading && !status.error && blog ? (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
          <article className="grid gap-6">
            {blog.coverImage ? (
              <div className="overflow-hidden rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-0 shadow-[var(--shadow-glow)] backdrop-blur-xl">
                <img src={blog.coverImage} alt={blog.title} className="h-[24rem] w-full object-cover" />
              </div>
            ) : null}

            <div className="relative rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-[var(--shadow-glow)] backdrop-blur-xl before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-accent-400/80 before:to-transparent before:content-[''] sm:p-8">
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-accent-400" />
                  {formatDate(blog.createdAt)}
                </span>
                <span>{blog.slug}</span>
              </div>

              {blog.excerpt ? (
                <p className="mt-6 text-lg leading-8 text-white/68">{blog.excerpt}</p>
              ) : null}

              <div className="mt-8 whitespace-pre-wrap text-base leading-8 text-white/82">
                {blog.content}
              </div>
            </div>
          </article>

          <div className="grid gap-6">
            <div className="rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-[var(--shadow-glow)] backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                Metadata
              </p>
              <div className="mt-4 grid gap-4 text-sm text-white/70">
                <div className="flex items-center justify-between gap-3 border-b border-white/6 pb-4">
                  <span>ID</span>
                  <span className="max-w-[12rem] truncate font-mono text-xs text-white">{blog._id}</span>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-white/6 pb-4">
                  <span>Author</span>
                  <span className="font-semibold text-white">{blog.author?.name || "Unknown"}</span>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-white/6 pb-4">
                  <span>Created</span>
                  <span className="font-semibold text-white">{formatDate(blog.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Updated</span>
                  <span className="font-semibold text-white">{formatDate(blog.updatedAt)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-[var(--shadow-glow)] backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Access</p>
              <p className="mt-4 text-sm leading-7 text-white/60">
                {isOwner
                  ? "You own this blog and can edit or delete it."
                  : isAuthenticated
                    ? "This blog is view only for you because it belongs to another user."
                    : "This blog is public to read, but editing requires signing in as the owner."}
              </p>
            </div>

            <div className="rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-[var(--shadow-glow)] backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Tags</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(blog.tags || []).length > 0 ? (
                  blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/65"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-white/52">No tags assigned</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </BlogShell>
  );
}
