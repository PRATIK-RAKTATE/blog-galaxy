import crypto from "crypto";

/* ------------------ helpers ------------------ */

const rand = (min = 30, max = 90) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const scoreLabel = (v) => {
  if (v >= 80) return "Excellent";
  if (v >= 60) return "Good";
  if (v >= 40) return "Medium";
  return "Needs work";
};

const normalizeInput = (raw) => {
  const value = String(raw ?? "").trim();

  if (/^\d+$/.test(value)) {
    return { type: "raw", value };
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return { type: "url", value };
  }

  if (value.includes(".")) {
    return { type: "url", value: `https://${value}` };
  }

  return { type: "keyword", value };
};

/* ------------------ controller ------------------ */

export const analyzeSEO = async (req, res) => {
  try {
    const { input } = req.body;
    const normalizedInput = normalizeInput(input);

    const seoScore = rand();
    const keywordDifficulty = rand();
    const readability = rand();
    const domainAuthority = rand();

    return res.status(200).json({
      success: true,
      data: {
        input: normalizedInput,

        summary: {
          seoScore: {
            value: seoScore,
            label: scoreLabel(seoScore),
            percent: Number((seoScore / 100).toFixed(2)),
          },
          keywordDifficulty: {
            value: keywordDifficulty,
            label: scoreLabel(keywordDifficulty),
            percent: Number((keywordDifficulty / 100).toFixed(2)),
          },
          searchVolume: {
            value: rand(1000, 9000),
            display: `${rand(3, 9)}.${rand(0, 9)}K`,
            unit: "monthly",
            trend: {
              percent: rand(1, 20),
              direction: pick(["up", "down"]),
            },
          },
          readability: {
            score: readability,
            label:
              readability > 70
                ? "Easy to read"
                : readability > 50
                ? "Average"
                : "Hard to read",
            gradeLevel: `${rand(6, 12)}th`,
          },
          backlinkPotential: {
            label: pick(["Low", "Medium", "High"]),
            opportunities: rand(40, 200),
            deltaThisWeek: rand(1, 40),
          },
        },

        keywordInsights: {
          primaryKeyword:
            normalizedInput.type === "keyword"
              ? normalizedInput.value
              : "AI blog writing",
          relatedKeywords: [
            { keyword: "AI content generation", competition: "Low" },
            { keyword: "automated blogging", competition: "Medium" },
            { keyword: "SEO writing AI", competition: "High" },
            { keyword: "AI blog tools", competition: "Medium" },
          ],
          longTailSuggestions: [
            "best AI blog writing tools",
            "how to use AI for blogging",
            "AI blog writer free",
            "AI content creator for blogs",
          ],
        },

        contentOptimization: {
          completedCount: 5,
          totalCount: 8,
          items: [
            { id: "meta_title", text: "Meta title optimization", completed: true, priority: "High" },
            { id: "headings", text: "Heading structure", completed: true, priority: "High" },
            { id: "internal_links", text: "Internal linking strategy", completed: false, priority: "Medium" },
            { id: "keyword_density", text: "Keyword density optimization", completed: true, priority: "High" },
            { id: "image_alt", text: "Image alt tags", completed: false, priority: "Medium" },
            { id: "meta_description", text: "Meta description", completed: true, priority: "High" },
            { id: "url_structure", text: "URL structure", completed: true, priority: "Low" },
            { id: "schema", text: "Schema markup", completed: false, priority: "Low" },
          ],
        },

        competitors: {
          items: [
            {
              domain: "competitor1.com",
              trafficPerMonth: rand(100000, 300000),
              trafficDisplay: "245K",
              domainAuthority,
              backlinksDisplay: "12.5K",
              url: "https://competitor1.com",
            },
            {
              domain: "competitor2.com",
              trafficPerMonth: rand(80000, 250000),
              trafficDisplay: "189K",
              domainAuthority: rand(),
              backlinksDisplay: "8.2K",
              url: "https://competitor2.com",
            },
          ],
        },

        meta: {
          generatedAt: new Date().toISOString(),
          analysisId: `ana_${crypto.randomUUID()}`,
          version: "v1",
        },
      },
    });
  } catch (error) {
    console.error("SEO analysis error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
