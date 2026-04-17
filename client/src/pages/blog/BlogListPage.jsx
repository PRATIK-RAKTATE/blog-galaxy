import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BlogShell } from "./BlogShell";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { getBlogsRequest } from "../../lib/api";

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function BlogListPage() {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    let active = true;

    async function loadBlogs() {
      try {
        setStatus({ loading: true, error: "" });
        const result = await getBlogsRequest();

        if (!active) {
          return;
        }

        setBlogs(result.blogs || []);
        setStatus({ loading: false, error: "" });
      } catch (error) {
        if (!active) {
          return;
        }

        setStatus({ loading: false, error: error.message || "Failed to load blogs" });
      }
    }

    loadBlogs();

    return () => {
      active = false;
    };
  }, []);

  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return blogs;
    }

    return blogs.filter((blog) =>
      [blog.title, blog.excerpt, blog.content, ...(blog.tags || [])]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [blogs, search]);

  return (
    <BlogShell
      title="Manage traditional blog posts without leaving the app"
      description="Browse every post, inspect full entries, and jump directly into create or edit flows against the live blog CRUD API."
      actions={
        <>
          <Button as={Link} to="/blogs/new">
            <Plus className="h-4 w-4" />
            New post
          </Button>
        </>
      }
    >
      <div className="grid gap-6">
        <div className="rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-4 shadow-[var(--shadow-glow)] backdrop-blur-xl sm:p-5">
          <label className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/48">
            <Search className="h-4 w-4 text-accent-400" />
            Search posts
          </label>
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search title, tags, excerpt, or content"
          />
        </div>

        {status.loading ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="min-h-52 animate-pulse rounded-[var(--radius-card)] border border-white/8 bg-white/[0.03] shadow-[var(--shadow-glow)] backdrop-blur-xl" />
            ))}
          </div>
        ) : null}

        {!status.loading && status.error ? (
          <div className="rounded-[var(--radius-card)] border border-red-400/25 bg-red-400/8 p-6 shadow-[var(--shadow-glow)] backdrop-blur-xl">
            <p className="text-sm text-red-200">{status.error}</p>
          </div>
        ) : null}

        {!status.loading && !status.error && filteredBlogs.length === 0 ? (
          <div className="relative rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-8 text-center shadow-[var(--shadow-glow)] backdrop-blur-xl before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-accent-400/80 before:to-transparent before:content-['']">
            <p className="text-xl font-semibold text-white">No blogs matched.</p>
            <p className="mt-3 text-sm leading-7 text-white/60">
              {blogs.length === 0
                ? "Create the first post to populate the blog workspace."
                : "Try a different search query or clear the current filter."}
            </p>
            <div className="mt-6">
              <Button as={Link} to="/blogs/new">
                Create post
              </Button>
            </div>
          </div>
        ) : null}

        {!status.loading && !status.error && filteredBlogs.length > 0 ? (
          <div className="grid gap-5 xl:grid-cols-2">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="relative flex h-full flex-col justify-between gap-6 rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-[var(--shadow-glow)] backdrop-blur-xl before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-accent-400/80 before:to-transparent before:content-[''] sm:p-7"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                    <span>{formatDate(blog.createdAt)}</span>
                    <span>{blog.slug}</span>
                    <span>{blog.author?.name || "Unknown author"}</span>
                  </div>
                  <h2 className="mt-4 font-display text-3xl text-white">{blog.title}</h2>
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/62">
                    {blog.excerpt || blog.content}
                  </p>
                  {(blog.tags || []).length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={`${blog._id}-${tag}`}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/65"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button as={Link} to={`/blogs/${blog.slug}`} className="rounded-full">
                    Read post
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  {blog.author?.id === user?.id ? (
                    <Button
                      as={Link}
                      to={`/blogs/${blog.slug}/edit`}
                      variant="secondary"
                      className="rounded-full"
                    >
                      Edit
                    </Button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </BlogShell>
  );
}
