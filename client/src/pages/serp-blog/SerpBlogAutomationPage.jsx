import { useMemo, useState } from "react";
import { Bot, CheckCircle2, LoaderCircle, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { createBlogRequest, generateSerpBlogRequest } from "../../lib/api";
import { SerpBlogShell } from "./SerpBlogShell";

function ResultList({ items, emptyText }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-white/52">{emptyText}</p>;
  }

  return (
    <ul className="grid gap-3 text-sm leading-7 text-white/76">
      {items.map((item) => (
        <li key={item} className="rounded-[1rem] border border-white/8 bg-white/[0.03] px-4 py-3">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function SerpBlogAutomationPage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null);
  const [publishedBlog, setPublishedBlog] = useState(null);
  const [status, setStatus] = useState({
    loading: false,
    publishing: false,
    error: "",
    publishError: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setStatus({ loading: true, publishing: false, error: "", publishError: "" });
      setPublishedBlog(null);
      const nextResult = await generateSerpBlogRequest({ topic });
      setResult(nextResult.automation || null);
      setStatus({ loading: false, publishing: false, error: "", publishError: "" });
    } catch (error) {
      setStatus({
        loading: false,
        publishing: false,
        error: error.message || "Failed to generate SERP blog automation",
        publishError: "",
      });
    }
  }

  async function handlePublish() {
    if (!result) {
      return;
    }

    try {
      setStatus((current) => ({ ...current, publishing: true, publishError: "" }));

      const sections = (result.article?.sections || [])
        .map((section) => `## ${section.heading}\n\n${section.content}`)
        .join("\n\n");
      const faq = (result.article?.faq || [])
        .map((item) => `### ${item.question}\n\n${item.answer}`)
        .join("\n\n");
      const content = [
        result.article?.introduction,
        sections,
        result.article?.conclusion ? `## Conclusion\n\n${result.article.conclusion}` : "",
        faq ? `## FAQ\n\n${faq}` : "",
      ]
        .filter(Boolean)
        .join("\n\n");

      const created = await createBlogRequest({
        title: result.article?.title || result.seo?.title || topic,
        excerpt: result.seo?.metaDescription || result.summary,
        content,
        tags: [
          result.seo?.primaryKeyword,
          ...(result.seo?.secondaryKeywords || []),
          "serp-automation",
        ]
          .filter(Boolean)
          .join(", "),
      });

      setPublishedBlog(created.blog || null);
      setStatus((current) => ({ ...current, publishing: false, publishError: "" }));
    } catch (error) {
      setStatus((current) => ({
        ...current,
        publishing: false,
        publishError: error.message || "Failed to publish generated blog",
      }));
    }
  }

  const sectionCount = useMemo(() => result?.article?.sections?.length || 0, [result]);

  return (
    <SerpBlogShell
      title="Generate a complete SEO blog package from only a topic"
      description="Send a single topic to the backend automation endpoint and get back formatted SEO strategy, competition context, outline, article structure, FAQ, and publishing steps."
      actions={
        <>
          <Button as={Link} to="/serp-blog/competition" variant="secondary" className="rounded-full">
            Topic competition
          </Button>
        </>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <Card accent className="space-y-6 p-6 sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
              Automation input
            </p>
            <h2 className="mt-3 font-display text-3xl text-white">Topic to full blog system</h2>
            <p className="mt-3 text-sm leading-7 text-white/60">
              The API handles strategy, outline, article structure, and publishing guidance in one response.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/72" htmlFor="automation-topic">
                Topic
              </label>
              <Input
                id="automation-topic"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="Benefits of remote work for productivity"
              />
            </div>

            {status.error ? <p className="text-sm text-red-200">{status.error}</p> : null}
            {status.publishError ? <p className="text-sm text-red-200">{status.publishError}</p> : null}

            <Button type="submit" disabled={status.loading || !topic.trim()} className="w-full rounded-full">
              {status.loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Bot className="h-4 w-4" />}
              {status.loading ? "Generating automation..." : "Generate package"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={!result || status.publishing}
              onClick={handlePublish}
              className="w-full rounded-full"
            >
              {status.publishing ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              {status.publishing ? "Publishing to blogs..." : "Publish to blogs"}
            </Button>
          </form>

          <Card className="p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">What comes back</p>
            <div className="mt-4 grid gap-3 text-sm text-white/72">
              <div className="flex items-center justify-between gap-3 border-b border-white/6 pb-3">
                <span>SEO fields</span>
                <span className="font-semibold text-white">Title, meta, keywords</span>
              </div>
              <div className="flex items-center justify-between gap-3 border-b border-white/6 pb-3">
                <span>Article structure</span>
                <span className="font-semibold text-white">{sectionCount || "Multiple"} sections</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Publishing guidance</span>
                <span className="font-semibold text-white">Checklist included</span>
              </div>
            </div>
          </Card>

          {publishedBlog ? (
            <Card className="p-5">
              <p className="inline-flex items-center gap-2 text-sm text-emerald-200">
                <CheckCircle2 className="h-4 w-4" />
                Published to blog system successfully.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  type="button"
                  onClick={() => navigate(`/blogs/${publishedBlog.slug || publishedBlog._id}`)}
                  className="rounded-full"
                >
                  Open published blog
                </Button>
                <Button as={Link} to="/blogs" variant="secondary" className="rounded-full">
                  Explore blogs
                </Button>
              </div>
            </Card>
          ) : null}
        </Card>

        <div className="grid gap-6">
          {!result && !status.loading ? (
            <Card className="p-8">
              <p className="text-sm text-white/60">
                Enter a topic and generate the automation package to see the structured response.
              </p>
            </Card>
          ) : null}

          {status.loading ? (
            <div className="grid gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="min-h-40 animate-pulse bg-white/[0.03]" />
              ))}
            </div>
          ) : null}

          {result ? (
            <>
              <Card accent className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Strategy</p>
                <h2 className="mt-4 font-display text-3xl text-white">{result.seo?.title}</h2>
                <p className="mt-4 text-sm leading-7 text-white/70">{result.summary}</p>
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/42">Audience</p>
                    <p className="mt-2 text-sm leading-7 text-white/76">{result.targetAudience}</p>
                  </div>
                  <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/42">Search intent</p>
                    <p className="mt-2 text-sm leading-7 text-white/76">{result.searchIntent}</p>
                  </div>
                </div>
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">SEO</p>
                  <div className="mt-4 grid gap-4 text-sm text-white/76">
                    <div>
                      <p className="text-white/44">Meta description</p>
                      <p className="mt-2 leading-7">{result.seo?.metaDescription}</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-white/44">Primary keyword</p>
                        <p className="mt-2">{result.seo?.primaryKeyword}</p>
                      </div>
                      <div>
                        <p className="text-white/44">Suggested URL</p>
                        <p className="mt-2 break-all">{result.seo?.suggestedUrl}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/44">Secondary keywords</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(result.seo?.secondaryKeywords || []).map((keyword) => (
                          <span
                            key={keyword}
                            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/65"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                    Competition snapshot
                  </p>
                  <div className="mt-4 grid gap-4 text-sm text-white/76">
                    <div className="flex items-center justify-between gap-3">
                      <span>Level</span>
                      <span className="font-semibold text-white">{result.competitionSnapshot?.level}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Score</span>
                      <span className="font-semibold text-white">
                        {result.competitionSnapshot?.score}/100
                      </span>
                    </div>
                    <div>
                      <p className="text-white/44">Reasoning</p>
                      <p className="mt-2 leading-7">{result.competitionSnapshot?.reasoning}</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Strengths to beat</p>
                  <div className="mt-4">
                    <ResultList
                      items={result.competitionSnapshot?.strengthsToBeat}
                      emptyText="No strengths were returned."
                    />
                  </div>
                </Card>
                <Card className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Gaps to exploit</p>
                  <div className="mt-4">
                    <ResultList
                      items={result.competitionSnapshot?.gapsToExploit}
                      emptyText="No gaps were returned."
                    />
                  </div>
                </Card>
              </div>

              <Card className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Outline</p>
                <div className="mt-5 grid gap-4">
                  {(result.outline || []).map((item) => (
                    <div key={item.heading} className="rounded-[1rem] border border-white/8 bg-white/[0.03] p-5">
                      <h3 className="font-semibold text-white">{item.heading}</h3>
                      <div className="mt-3">
                        <ResultList items={item.keyPoints} emptyText="No key points returned." />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Article</p>
                <h2 className="mt-4 font-display text-3xl text-white">{result.article?.title}</h2>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-white/76">
                  {result.article?.introduction}
                </p>
                <div className="mt-6 grid gap-5">
                  {(result.article?.sections || []).map((section) => (
                    <div key={section.heading} className="rounded-[1rem] border border-white/8 bg-white/[0.03] p-5">
                      <h3 className="font-semibold text-white">{section.heading}</h3>
                      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/76">
                        {section.content}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-[1rem] border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/42">Conclusion</p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-white/76">
                    {result.article?.conclusion}
                  </p>
                </div>
              </Card>

              <div className="grid gap-6 lg:grid-cols-2">
                <Card className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">FAQ</p>
                  <div className="mt-4 grid gap-4">
                    {(result.article?.faq || []).map((item) => (
                      <div key={item.question} className="rounded-[1rem] border border-white/8 bg-white/[0.03] p-4">
                        <p className="font-semibold text-white">{item.question}</p>
                        <p className="mt-2 text-sm leading-7 text-white/76">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                    Publishing checklist
                  </p>
                  <div className="mt-4">
                    <ResultList
                      items={result.publishingChecklist}
                      emptyText="No publishing checklist returned."
                    />
                  </div>
                </Card>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </SerpBlogShell>
  );
}
