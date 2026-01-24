// src/api/seo.ts
export type Competition = "Low" | "Medium" | "High";
export type Priority = "Low" | "Medium" | "High";

export type SeoAnalysisResponse = {
  success: boolean;
  data?: {
    input: { type: "url" | "topic"; value: string };

    summary: {
      seoScore: { value: number; label: string; percent: number };
      keywordDifficulty: { value: number; label: string; percent: number };
      searchVolume: {
        value: number;
        display: string;
        unit: "monthly";
        trend?: { percent: number; direction: "up" | "down" | "flat" };
      };
      readability: { score: number; label: string; gradeLevel: string };
      backlinkPotential: { label: string; opportunities: number; deltaThisWeek: number };
    };

    keywordInsights: {
      primaryKeyword: string;
      relatedKeywords: { keyword: string; competition: Competition }[];
      longTailSuggestions: string[];
    };

    contentOptimization: {
      completedCount: number;
      totalCount: number;
      items: { id: string; text: string; completed: boolean; priority: Priority }[];
    };

    competitors: {
      items: {
        domain: string;
        trafficPerMonth: number;
        trafficDisplay: string;
        domainAuthority: number;
        backlinksDisplay: string;
        url?: string;
      }[];
    };

    meta?: { generatedAt: string; analysisId: string; version: string };
  };
  message?: string;
  error?: string;
};

const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") || "https://blog-galaxy.onrender.com/";

export async function analyzeSeo(input: string): Promise<NonNullable<SeoAnalysisResponse["data"]>> {
  const res = await fetch(`${API_BASE}api/v1/seo/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input }),
  });

  const data = (await res.json()) as SeoAnalysisResponse;

  if (!res.ok || !data.success || !data.data) {
    throw new Error(data.message || data.error || `SEO analyze failed (${res.status})`);
  }

  return data.data;
}
