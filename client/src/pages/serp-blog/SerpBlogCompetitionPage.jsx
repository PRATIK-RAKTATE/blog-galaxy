import { useState } from "react";
import { LineChart, LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { checkTopicCompetitionRequest } from "../../lib/api";
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

export function SerpBlogCompetitionPage() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState({ loading: false, error: "" });

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setStatus({ loading: true, error: "" });
      const nextResult = await checkTopicCompetitionRequest({ topic });
      setResult(nextResult.analysis || null);
      setStatus({ loading: false, error: "" });
    } catch (error) {
      setStatus({ loading: false, error: error.message || "Failed to analyze topic competition" });
    }
  }

  return (
    <SerpBlogShell
      title="Check blog-topic competition before you commit to the article"
      description="Run the dedicated competition endpoint to get a clean score, realistic risks, keyword directions, and recommended positioning angles for a topic."
      actions={
        <>
          <Button as={Link} to="/serp-blog" variant="secondary" className="rounded-full">
            Full automation
          </Button>
        </>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
        <Card accent className="space-y-6 p-6 sm:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
              Competition input
            </p>
            <h2 className="mt-3 font-display text-3xl text-white">Topic difficulty snapshot</h2>
            <p className="mt-3 text-sm leading-7 text-white/60">
              Use this before writing to gauge whether the angle, keyword shape, and effort level make sense.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-white/72" htmlFor="competition-topic">
                Topic
              </label>
              <Input
                id="competition-topic"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="Remote work productivity tips"
              />
            </div>

            {status.error ? <p className="text-sm text-red-200">{status.error}</p> : null}

            <Button type="submit" disabled={status.loading || !topic.trim()} className="w-full rounded-full">
              {status.loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <LineChart className="h-4 w-4" />}
              {status.loading ? "Checking competition..." : "Check competition"}
            </Button>
          </form>
        </Card>

        <div className="grid gap-6">
          {!result && !status.loading ? (
            <Card className="p-8">
              <p className="text-sm text-white/60">
                Enter a topic to inspect competition level, keyword opportunities, and positioning risks.
              </p>
            </Card>
          ) : null}

          {status.loading ? (
            <div className="grid gap-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index} className="min-h-36 animate-pulse bg-white/[0.03]" />
              ))}
            </div>
          ) : null}

          {result ? (
            <>
              <Card accent className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                      Competition verdict
                    </p>
                    <h2 className="mt-3 font-display text-3xl text-white">{result.competition?.verdict}</h2>
                  </div>
                  <div className="rounded-[1.2rem] border border-white/8 bg-white/[0.03] px-5 py-4 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/42">Score</p>
                    <p className="mt-2 text-3xl font-semibold text-white">
                      {result.competition?.score}
                      <span className="text-base text-white/54">/100</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/42">Level</p>
                    <p className="mt-2 text-sm text-white/76">{result.competition?.level}</p>
                  </div>
                  <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/42">Intent</p>
                    <p className="mt-2 text-sm text-white/76">{result.competition?.dominantIntent}</p>
                  </div>
                  <div className="rounded-[1rem] border border-white/8 bg-white/[0.03] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/42">Depth</p>
                    <p className="mt-2 text-sm text-white/76">{result.competition?.estimatedContentDepth}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-[1rem] border border-white/8 bg-white/[0.03] p-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/42">Reasoning</p>
                  <p className="mt-3 text-sm leading-7 text-white/76">{result.competition?.reasoning}</p>
                </div>
              </Card>

              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Opportunities</p>
                  <div className="mt-4">
                    <ResultList items={result.opportunities} emptyText="No opportunities were returned." />
                  </div>
                </Card>
                <Card className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Risks</p>
                  <div className="mt-4">
                    <ResultList items={result.risks} emptyText="No risks were returned." />
                  </div>
                </Card>
                <Card className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                    Recommended angles
                  </p>
                  <div className="mt-4">
                    <ResultList
                      items={result.recommendedAngles}
                      emptyText="No recommended angles were returned."
                    />
                  </div>
                </Card>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <Card className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Primary keyword</p>
                  <p className="mt-4 text-sm text-white/76">{result.keywords?.primary}</p>
                </Card>
                <Card className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                    Secondary keywords
                  </p>
                  <div className="mt-4">
                    <ResultList
                      items={result.keywords?.secondary}
                      emptyText="No secondary keywords were returned."
                    />
                  </div>
                </Card>
                <Card className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">Long-tail keywords</p>
                  <div className="mt-4">
                    <ResultList
                      items={result.keywords?.longTail}
                      emptyText="No long-tail keywords were returned."
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
