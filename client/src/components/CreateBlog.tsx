import { useMemo, useState } from "react";
import type { PageCommonProps } from "../App";

type TextValue = string | { text?: string } | null | undefined;

type BlogOutput = {
  h1?: TextValue;
  h2_1?: TextValue;
  h2_2?: TextValue;
  h3_1?: TextValue;
  h3_2?: TextValue;
  h3_3?: TextValue;
  p1?: TextValue;
  p2?: TextValue;
  p3?: TextValue;
  p4?: TextValue;
};

type AnyApiResponse = {
  success?: boolean;
  message?: string;
  debug?: unknown;
  output?: unknown;
  [key: string]: unknown;
};

function isValidNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function getText(val: TextValue): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  if (typeof val === "object" && typeof val.text === "string") return val.text;
  return "";
}

function stripHtmlTags(s: string): string {
  return s.replace(/<\/?[^>]+(>|$)/g, "");
}

function isBlogOutput(x: unknown): x is BlogOutput {
  return !!x && typeof x === "object";
}

type CreateBlogProps = PageCommonProps & { apiUrl?: string };

export function CreateBlog({
  theme,
  toggleTheme,
  apiUrl = "http://localhost:5000/api/v1/seo/create",
}: CreateBlogProps) {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  // store raw response "as is"
  const [rawText, setRawText] = useState<string>("");
  const [responseObj, setResponseObj] = useState<AnyApiResponse | null>(null);

  // If output is object with fields, prepare blog view
  const blog = useMemo(() => {
    const out = responseObj?.output;
    if (!isBlogOutput(out)) return null;

    const b = out as BlogOutput;

    const h1 = stripHtmlTags(getText(b.h1));
    const h2_1 = stripHtmlTags(getText(b.h2_1));
    const h2_2 = stripHtmlTags(getText(b.h2_2));
    const h3_1 = stripHtmlTags(getText(b.h3_1));
    const h3_2 = stripHtmlTags(getText(b.h3_2));
    const h3_3 = stripHtmlTags(getText(b.h3_3));
    const p1 = stripHtmlTags(getText(b.p1));
    const p2 = stripHtmlTags(getText(b.p2));
    const p3 = stripHtmlTags(getText(b.p3));
    const p4 = stripHtmlTags(getText(b.p4));

    return { h1, h2_1, h2_2, h3_1, h3_2, h3_3, p1, p2, p3, p4 };
  }, [responseObj]);

  async function handleGenerate() {
    if (!isValidNonEmptyString(topic)) return;

    setLoading(true);
    setRawText("");
    setResponseObj(null);

    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: topic.trim() }),
      });

      const text = await res.text();
      setRawText(text);

      // Try parse JSON (no validation, no success checking)
      try {
        const parsed = JSON.parse(text) as AnyApiResponse;
        setResponseObj(parsed);
      } catch {
        setResponseObj(null);
      }
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !loading) handleGenerate();
  }

  function copyRaw() {
    if (!rawText) return;
    navigator.clipboard.writeText(rawText);
  }

  function copyJson() {
    if (!responseObj) return;
    navigator.clipboard.writeText(JSON.stringify(responseObj, null, 2));
  }

  const outputIsString =
    typeof responseObj?.output === "string" ? (responseObj?.output as string) : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Gradient background decor */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl" />
        <div className="absolute top-48 left-10 h-56 w-56 rounded-full bg-gradient-to-br from-cyan-500/15 to-blue-500/10 blur-2xl" />
        <div className="absolute top-80 right-10 h-56 w-56 rounded-full bg-gradient-to-br from-purple-500/15 to-pink-500/10 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pt-14 pb-10">
        {/* Top spacing + header card */}
        <div className="mb-8 rounded-3xl border border-gray-200/70 dark:border-gray-800/70 bg-white/70 dark:bg-zinc-950/60 backdrop-blur shadow-sm">
          <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Create Blog
              </h1>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Type a topic and press <b>Send</b> (or hit Enter). We will render the API response as-is.
              </p>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center justify-center rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-zinc-950/80 px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 shadow-sm hover:shadow transition"
            >
              Theme: {theme}
            </button>
          </div>
        </div>

        {/* Input Card */}
        <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800/70 bg-white/70 dark:bg-zinc-950/60 backdrop-blur shadow-sm p-5 md:p-7 mb-8">
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">
            Topic / Prompt
          </label>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                <span className="text-sm">✦</span>
              </div>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder='e.g. "AI blog writing tools for 2026"'
                className="w-full rounded-2xl border border-gray-300/80 dark:border-gray-700/80 bg-white/90 dark:bg-black/70 pl-9 pr-4 py-3 text-sm text-gray-900 dark:text-gray-100 outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-transparent shadow-sm"
              />
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                Tip: keep prompts specific (audience, tone, length).
              </p>
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="relative rounded-2xl px-7 py-3 text-sm font-semibold text-white shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed min-w-[150px]
                bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700"
            >
              {loading ? "Generating..." : "Send"}
              {!loading && (
                <span className="ml-2 text-white/80">→</span>
              )}
            </button>
          </div>

          {/* Loader */}
          {loading && (
            <div className="mt-5 rounded-2xl border border-blue-200/70 dark:border-blue-900/60 bg-blue-50/70 dark:bg-blue-950/30 px-4 py-3 text-sm text-blue-700 dark:text-blue-200 flex items-center gap-3">
              <div className="h-4 w-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
              <span>Generating… please wait.</span>
            </div>
          )}
        </div>

        {/* Preview Card */}
        <div className="rounded-3xl border border-gray-200/70 dark:border-gray-800/70 bg-white/70 dark:bg-zinc-950/60 backdrop-blur shadow-sm overflow-hidden">
          <div className="border-b border-gray-200/70 dark:border-gray-800/70 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600" />
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Preview</p>
            </div>

            <div className="flex items-center gap-3">
              {rawText && (
                <button
                  type="button"
                  onClick={copyRaw}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Copy Raw
                </button>
              )}
              {responseObj && (
                <button
                  type="button"
                  onClick={copyJson}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Copy JSON
                </button>
              )}
            </div>
          </div>

          <div className="px-6 py-8">
            {!rawText ? (
              <div className="rounded-2xl border border-dashed border-gray-300/70 dark:border-gray-700/70 bg-white/50 dark:bg-black/30 p-8 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  No content yet. Enter a topic and click <b>Send</b>.
                </p>
              </div>
            ) : blog ? (
              <article
                className="
                  prose prose-gray dark:prose-invert max-w-none
                  prose-h1:text-3xl prose-h1:font-semibold
                  prose-h2:text-xl prose-h2:font-semibold prose-h2:mt-6
                  prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-5
                  prose-p:leading-7
                "
              >
                {blog.h1 && <h1>{blog.h1}</h1>}

                {blog.h2_1 && <h2>{blog.h2_1}</h2>}
                {blog.p1 && <p>{blog.p1}</p>}

                {blog.h2_2 && <h2>{blog.h2_2}</h2>}
                {blog.p2 && <p>{blog.p2}</p>}

                {blog.h3_1 && <h3>{blog.h3_1}</h3>}
                {blog.p3 && <p>{blog.p3}</p>}

                {blog.h3_2 && <h3>{blog.h3_2}</h3>}
                {blog.p4 && <p>{blog.p4}</p>}

                {blog.h3_3 && <h3>{blog.h3_3}</h3>}
              </article>
            ) : outputIsString ? (
              <pre className="whitespace-pre-wrap break-words text-sm text-gray-800 dark:text-gray-200 rounded-2xl border border-gray-200/70 dark:border-gray-800/70 bg-white/60 dark:bg-black/30 p-5">
                {outputIsString}
              </pre>
            ) : (
              <pre className="whitespace-pre-wrap break-words text-sm text-gray-800 dark:text-gray-200 rounded-2xl border border-gray-200/70 dark:border-gray-800/70 bg-white/60 dark:bg-black/30 p-5">
                {JSON.stringify(responseObj ?? rawText, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
