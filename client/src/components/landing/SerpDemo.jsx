import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "./SectionHeading";
import { generateAIRequest } from "../../lib/api";

function matchResponse(input, responses) {
  const normalized = input.toLowerCase();
  return (
    responses.find((entry) => entry.keywords.some((keyword) => keyword !== "default" && normalized.includes(keyword))) ||
    responses.find((entry) => entry.keywords.includes("default"))
  );
}

const loadingStages = [
  "Analyzing topic...",
  "Researching keywords...",
  "Generating outline...",
  "Writing content...",
  "Optimizing SEO...",
];

function buildPrompt(topic) {
  return [
    "You are generating a SERP-style preview for a blog topic.",
    `Topic: ${topic.trim()}`,
    "Return exactly these sections in plain text:",
    "TITLE: <seo title>",
    "DESCRIPTION: <meta description or short preview>",
    "INTENT: <one sentence on search intent>",
    "Keep it concise and publication-ready.",
  ].join("\n");
}

function parseAIOutput(output, fallback) {
  const titleMatch = output.match(/TITLE:\s*(.+)/i);
  const descriptionMatch = output.match(/DESCRIPTION:\s*(.+)/i);
  const intentMatch = output.match(/INTENT:\s*(.+)/i);

  return {
    title: titleMatch?.[1]?.trim() || fallback.title,
    description: descriptionMatch?.[1]?.trim() || fallback.description,
    intent:
      intentMatch?.[1]?.trim() ||
      "Shape the page around clear intent, tight messaging, and a publish-ready search snippet.",
    raw: output.trim(),
  };
}

export function SerpDemo({ responses, reducedMotion }) {
  const [topic, setTopic] = useState("saas content workflow");
  const [loading, setLoading] = useState(false);
  const [activeStage, setActiveStage] = useState(0);
  const [generatedResponse, setGeneratedResponse] = useState(null);
  const [error, setError] = useState("");
  const timeoutRef = useRef(null);
  const fallbackResponse = useMemo(() => matchResponse(topic, responses), [topic, responses]);
  const response = generatedResponse || fallbackResponse;
  const animation = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearInterval(timeoutRef.current);
      }
    };
  }, []);

  async function handleGenerate() {
    if (!topic.trim() || loading) {
      return;
    }

    if (timeoutRef.current) {
      window.clearInterval(timeoutRef.current);
    }

    setLoading(true);
    setError("");
    setGeneratedResponse(null);
    setActiveStage(0);

    timeoutRef.current = window.setInterval(() => {
      setActiveStage((current) => {
        if (current >= loadingStages.length - 1) {
          return current;
        }

        return current + 1;
      });
    }, 900);

    try {
      const result = await generateAIRequest({
        input: buildPrompt(topic),
      });

      setGeneratedResponse(parseAIOutput(result.output || "", fallbackResponse));
      setActiveStage(loadingStages.length - 1);
    } catch (requestError) {
      setError(requestError.message || "Failed to generate AI preview");
      setGeneratedResponse(null);
      setActiveStage(0);
    } finally {
      if (timeoutRef.current) {
        window.clearInterval(timeoutRef.current);
      }

      setLoading(false);
    }
  }

  const progress = loading
    ? ((activeStage + 1) / loadingStages.length) * 100
    : generatedResponse
      ? 100
      : 0;

  return (
    <section id="serp-demo" aria-labelledby="serp-heading" className="px-4 py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--spacing-container)]">
        <SectionHeading
          number="03"
          eyebrow="SERP demo"
          title="Type a topic. Generate a live SERP preview."
          description="This demo now calls the AI endpoint directly and turns the response into a search-style preview with visible generation stages."
          align="center"
          reducedMotion={reducedMotion}
        />
        <Reveal reducedMotion={reducedMotion} className="mx-auto mt-12 max-w-4xl">
          <div className="overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#f8f4ee] shadow-[0_30px_100px_rgba(0,0,0,0.32)]">
            <div className="flex items-center gap-2 border-b border-black/6 px-5 py-4">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                  <Input
                    value={topic}
                    onChange={(event) => setTopic(event.target.value)}
                    aria-label="Enter a blog topic"
                    placeholder="Benefits of remote work for productivity"
                    className="border-black/10 bg-white px-5 py-4 text-base text-ink-900 placeholder:text-ink-700/45 focus:border-accent-500/60"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleGenerate}
                  disabled={loading || !topic.trim()}
                  className="min-w-44 rounded-[1rem] px-6 py-4 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Generating..." : "Generate"}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="mt-8 rounded-[1.4rem] border border-black/6 bg-white/72 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 text-sm font-medium text-ink-800/80">
                  <span>{loading ? loadingStages[activeStage] : generatedResponse ? "Generation complete" : "Ready to generate"}</span>
                  <span>{loading ? "Waiting..." : generatedResponse ? "Complete" : "Idle"}</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e9e5df]">
                  <div
                    className="h-full rounded-full bg-linear-to-r from-[#3b82f6] via-[#7c3aed] to-[#c026d3] transition-[width] duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="mt-6 grid gap-3">
                  {loadingStages.map((stage, index) => {
                    const isDone = loading && index < activeStage;
                    const isCurrent = loading && index === activeStage;
                    const isCompleted = !loading && generatedResponse;

                    return (
                      <div key={stage} className="flex items-center gap-3 text-sm text-ink-800">
                        {isDone || (isCompleted && index <= loadingStages.length - 1) ? (
                          <CheckCircle2 className="h-5 w-5 text-[#22c55e]" />
                        ) : isCurrent ? (
                          <span className="h-5 w-5 rounded-full border-2 border-[#3b82f6] border-t-transparent animate-spin" />
                        ) : (
                          <span className="h-5 w-5 rounded-full border-2 border-[#3b82f6]/35" />
                        )}
                        <span className={isCurrent ? "font-semibold" : ""}>{stage}</span>
                      </div>
                    );
                  })}
                </div>

                {error ? (
                  <div className="mt-6 rounded-[1rem] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                ) : null}

                <div className="mt-6 overflow-hidden rounded-[1.2rem] border border-black/6 bg-white p-5">
                  <motion.article key={`${response.title}-${loading ? "loading" : "ready"}`} {...animation}>
                    <div className="text-sm text-[#5c84e6]">
                      bloggalaxy.app/blog/{topic.trim().toLowerCase().replaceAll(" ", "-") || "serp-preview"}
                    </div>
                    <h3 className="mt-2 text-[1.7rem] leading-8 text-[#3564d8]">{response.title}</h3>
                    <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[#4f5f73]">{response.description}</p>
                    <div className="mt-5 rounded-[1rem] bg-[#f7f4ef] px-4 py-3 text-sm text-[#5b6472]">
                      <span className="font-semibold text-[#263041]">Intent:</span>{" "}
                      {response.intent ||
                        "Shape the page around clear intent, tight messaging, and a publish-ready search snippet."}
                    </div>
                  </motion.article>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
