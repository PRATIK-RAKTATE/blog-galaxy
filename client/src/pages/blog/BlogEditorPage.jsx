import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, LoaderCircle, Save } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { BlogShell } from "./BlogShell";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { createBlogRequest, getBlogRequest, updateBlogRequest } from "../../lib/api";

const emptyForm = {
  title: "",
  excerpt: "",
  coverImage: "",
  tags: "",
  content: "",
};

export function BlogEditorPage({ mode }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { blogIdOrSlug } = useParams();
  const isEditMode = mode === "edit";
  const [form, setForm] = useState(emptyForm);
  const [blog, setBlog] = useState(null);
  const [status, setStatus] = useState({
    loading: isEditMode,
    saving: false,
    error: "",
    notice: "",
  });
  const isOwner = Boolean(blog?.author?.id && user?.id && blog.author.id === user.id);
  const isReadOnly = isEditMode ? !isOwner : !isAuthenticated;

  useEffect(() => {
    if (!isEditMode || !blogIdOrSlug) {
      return undefined;
    }

    let active = true;

    async function loadBlog() {
      try {
        setStatus({ loading: true, saving: false, error: "", notice: "" });
        const result = await getBlogRequest(blogIdOrSlug);

        if (!active) {
          return;
        }

        setBlog(result.blog);
        setForm({
          title: result.blog.title || "",
          excerpt: result.blog.excerpt || "",
          coverImage: result.blog.coverImage || "",
          tags: (result.blog.tags || []).join(", "),
          content: result.blog.content || "",
        });
        setStatus({ loading: false, saving: false, error: "", notice: "" });
      } catch (error) {
        if (!active) {
          return;
        }

        setStatus({
          loading: false,
          saving: false,
          error: error.message || "Failed to load blog",
          notice: "",
        });
      }
    }

    loadBlog();

    return () => {
      active = false;
    };
  }, [blogIdOrSlug, isEditMode]);

  const wordCount = useMemo(() => {
    return form.content.trim() ? form.content.trim().split(/\s+/).length : 0;
  }, [form.content]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isReadOnly) {
      return;
    }

    try {
      setStatus((current) => ({ ...current, saving: true, error: "", notice: "" }));

      const payload = {
        title: form.title,
        excerpt: form.excerpt,
        coverImage: form.coverImage,
        tags: form.tags,
        content: form.content,
      };

      const result = isEditMode
        ? await updateBlogRequest(blogIdOrSlug, payload)
        : await createBlogRequest(payload);

      setStatus((current) => ({
        ...current,
        saving: false,
        error: "",
        notice: isEditMode ? "Blog updated successfully." : "Blog created successfully.",
      }));

      navigate(`/blogs/${result.blog.slug}`);
    } catch (error) {
      setStatus((current) => ({
        ...current,
        saving: false,
        error: error.message || "Failed to save blog",
        notice: "",
      }));
    }
  }

  return (
    <BlogShell
      title={isEditMode ? "Refine an existing post" : "Write a new blog post"}
      description={
        isEditMode
          ? "Update the title, body, tags, and imagery if you own the post. Other users get a view-only editor."
          : "Draft a traditional post with a clean editor, then send it directly to the backend create endpoint."
      }
      actions={
        <>
          <Button as={Link} to="/blogs" variant="secondary" className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
            Back to blogs
          </Button>
        </>
      }
    >
      {status.loading ? (
        <div className="rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-8 shadow-[var(--shadow-glow)] backdrop-blur-xl">
          <p className="text-sm text-white/60">Loading blog editor...</p>
        </div>
      ) : (
        <form className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]" onSubmit={handleSubmit}>
          <div className="relative space-y-6 rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-[var(--shadow-glow)] backdrop-blur-xl before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-accent-400/80 before:to-transparent before:content-[''] sm:p-8">
            {isReadOnly ? (
              <div className="rounded-[1rem] border border-amber-300/20 bg-amber-300/8 px-4 py-3 text-sm text-amber-100">
                {isEditMode
                  ? "This post is view only because you are not the owner."
                  : "You need to sign in to create a blog post."}
              </div>
            ) : null}

            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-white/72" htmlFor="title">
                  Title
                </label>
                <Input
                  id="title"
                  value={form.title}
                  disabled={isReadOnly}
                  onChange={(event) => updateField("title", event.target.value)}
                  placeholder="How to build a traditional blog workflow"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/72" htmlFor="excerpt">
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  rows={4}
                  value={form.excerpt}
                  disabled={isReadOnly}
                  onChange={(event) => updateField("excerpt", event.target.value)}
                  placeholder="Short summary for cards and previews"
                  className="w-full rounded-[var(--radius-button)] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ivory-100 outline-none transition placeholder:text-white/35 focus:border-accent-400/80"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/72" htmlFor="coverImage">
                    Cover image URL
                  </label>
                  <Input
                    id="coverImage"
                    value={form.coverImage}
                    disabled={isReadOnly}
                    onChange={(event) => updateField("coverImage", event.target.value)}
                    placeholder="https://images.example.com/post-cover.jpg"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white/72" htmlFor="tags">
                    Tags
                  </label>
                  <Input
                    id="tags"
                    value={form.tags}
                    disabled={isReadOnly}
                    onChange={(event) => updateField("tags", event.target.value)}
                    placeholder="seo, blogging, workflow"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-white/72" htmlFor="content">
                  Content
                </label>
                <textarea
                  id="content"
                  rows={18}
                  value={form.content}
                  disabled={isReadOnly}
                  onChange={(event) => updateField("content", event.target.value)}
                  placeholder="Write the full post content here"
                  className="min-h-[24rem] w-full rounded-[1.35rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm leading-7 text-ivory-100 outline-none transition placeholder:text-white/35 focus:border-accent-400/80"
                />
              </div>
            </div>

            {status.error ? <p className="text-sm text-red-200">{status.error}</p> : null}
            {status.notice ? (
              <p className="inline-flex items-center gap-2 text-sm text-emerald-200">
                <CheckCircle2 className="h-4 w-4" />
                {status.notice}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3">
              {!isReadOnly ? (
                <Button type="submit" disabled={status.saving} className="rounded-full">
                  {status.saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                  {status.saving ? "Saving..." : isEditMode ? "Update post" : "Publish post"}
                </Button>
              ) : null}
              <Button as={Link} to="/blogs" type="button" variant="secondary" className="rounded-full">
                {isReadOnly ? "Back to blogs" : "Cancel"}
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-[var(--shadow-glow)] backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                Draft summary
              </p>
              <div className="mt-4 grid gap-4 text-sm text-white/72">
                <div className="flex items-center justify-between gap-3 border-b border-white/6 pb-4">
                  <span>Words</span>
                  <span className="font-semibold text-white">{wordCount}</span>
                </div>
                <div className="flex items-center justify-between gap-3 border-b border-white/6 pb-4">
                  <span>Tags</span>
                  <span className="font-semibold text-white">
                    {form.tags
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean).length}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Cover image</span>
                  <span className="font-semibold text-white">
                    {form.coverImage.trim() ? "Attached" : "None"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-[var(--shadow-glow)] backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                Preview
              </p>
              <h2 className="mt-4 font-display text-3xl text-white">
                {form.title.trim() || "Untitled draft"}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/60">
                {form.excerpt.trim() || "A short excerpt appears here when you add one."}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {form.tags
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/65"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </form>
      )}
    </BlogShell>
  );
}
