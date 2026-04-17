import OpenAI from "openai";
import { env } from "../../config/env.js";

const groqClient = new OpenAI({
  apiKey: env.groqApiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

function normalizeString(value, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeStringArray(value, fallback = []) {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.map((item) => normalizeString(item)).filter(Boolean);
}

function normalizeOutline(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => ({
      heading: normalizeString(item?.heading),
      keyPoints: normalizeStringArray(item?.keyPoints),
    }))
    .filter((item) => item.heading);
}

function normalizeSections(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => ({
      heading: normalizeString(item?.heading),
      content: normalizeString(item?.content),
    }))
    .filter((item) => item.heading && item.content);
}

function normalizeFaq(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => ({
      question: normalizeString(item?.question),
      answer: normalizeString(item?.answer),
    }))
    .filter((item) => item.question && item.answer);
}

function buildSlug(topic) {
  return topic
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function sanitizeAutomationPayload(topic, model, payload) {
  const outline = normalizeOutline(payload?.outline);
  const sections = normalizeSections(payload?.article?.sections);
  const faq = normalizeFaq(payload?.article?.faq);
  const publishingChecklist = normalizeStringArray(payload?.publishingChecklist);

  return {
    topic,
    slug: buildSlug(topic) || "untitled-topic",
    model,
    summary: normalizeString(
      payload?.summary,
      "A search-focused blog plan generated from the provided topic.",
    ),
    targetAudience: normalizeString(
      payload?.targetAudience,
      "Marketers, founders, and content teams researching the topic.",
    ),
    searchIntent: normalizeString(
      payload?.searchIntent,
      "Deliver a clear, useful answer aligned to informational search intent.",
    ),
    seo: {
      title: normalizeString(payload?.seo?.title, topic),
      metaDescription: normalizeString(
        payload?.seo?.metaDescription,
        `Learn about ${topic} with a structured, search-friendly article.`,
      ),
      primaryKeyword: normalizeString(payload?.seo?.primaryKeyword, topic),
      secondaryKeywords: normalizeStringArray(payload?.seo?.secondaryKeywords),
      suggestedUrl: normalizeString(
        payload?.seo?.suggestedUrl,
        `/blog/${buildSlug(topic) || "untitled-topic"}`,
      ),
    },
    competitionSnapshot: {
      level: normalizeString(payload?.competitionSnapshot?.level, "Medium"),
      score: Math.max(
        1,
        Math.min(100, Number.parseInt(payload?.competitionSnapshot?.score, 10) || 55),
      ),
      reasoning: normalizeString(
        payload?.competitionSnapshot?.reasoning,
        "The topic has active competition and requires stronger structure and clearer differentiation.",
      ),
      strengthsToBeat: normalizeStringArray(payload?.competitionSnapshot?.strengthsToBeat),
      gapsToExploit: normalizeStringArray(payload?.competitionSnapshot?.gapsToExploit),
    },
    outline:
      outline.length > 0
        ? outline
        : [
            {
              heading: `Introduction to ${topic}`,
              keyPoints: ["Define the topic clearly", "Set expectations for the reader"],
            },
            {
              heading: `How to approach ${topic}`,
              keyPoints: ["Explain the process", "Share practical examples"],
            },
          ],
    article: {
      title: normalizeString(payload?.article?.title, topic),
      introduction: normalizeString(
        payload?.article?.introduction,
        `This article explores ${topic} in a clear, useful format.`,
      ),
      sections:
        sections.length > 0
          ? sections
          : [
              {
                heading: `What is ${topic}?`,
                content: `Start by defining ${topic} and explaining why it matters to the intended reader.`,
              },
              {
                heading: `Best practices for ${topic}`,
                content: `Cover the most useful strategies, examples, and practical recommendations for ${topic}.`,
              },
            ],
      conclusion: normalizeString(
        payload?.article?.conclusion,
        "Wrap with a practical summary and a clear next step for the reader.",
      ),
      faq:
        faq.length > 0
          ? faq
          : [
              {
                question: `What should readers know first about ${topic}?`,
                answer: `Readers should start with the fundamentals, then move into practical implementation for ${topic}.`,
              },
            ],
    },
    publishingChecklist:
      publishingChecklist.length > 0
        ? publishingChecklist
        : [
            "Review title and meta description",
            "Confirm headings match search intent",
            "Add internal links and examples",
          ],
  };
}

function sanitizeCompetitionPayload(topic, model, payload) {
  const opportunities = normalizeStringArray(payload?.opportunities);
  const risks = normalizeStringArray(payload?.risks);
  const recommendedAngles = normalizeStringArray(payload?.recommendedAngles);

  return {
    topic,
    slug: buildSlug(topic) || "untitled-topic",
    model,
    competition: {
      level: normalizeString(payload?.competition?.level, "Medium"),
      score: Math.max(1, Math.min(100, Number.parseInt(payload?.competition?.score, 10) || 55)),
      verdict: normalizeString(
        payload?.competition?.verdict,
        "This topic is viable, but it needs clearer positioning and stronger search alignment.",
      ),
      reasoning: normalizeString(
        payload?.competition?.reasoning,
        "Competing pages likely cover the basics already, so depth and differentiation matter.",
      ),
      dominantIntent: normalizeString(
        payload?.competition?.dominantIntent,
        "Informational intent with light commercial overlap.",
      ),
      estimatedContentDepth: normalizeString(
        payload?.competition?.estimatedContentDepth,
        "Medium-to-high depth article with examples and practical takeaways.",
      ),
    },
    opportunities:
      opportunities.length > 0
        ? opportunities
        : ["Publish a clearer, more complete version that targets a specific reader need."],
    risks:
      risks.length > 0
        ? risks
        : ["The topic may already have broad coverage from established publishers."],
    recommendedAngles:
      recommendedAngles.length > 0
        ? recommendedAngles
        : ["Use a more specific angle, stronger examples, and a tighter promise in the title."],
    keywords: {
      primary: normalizeString(payload?.keywords?.primary, topic),
      secondary: normalizeStringArray(payload?.keywords?.secondary),
      longTail: normalizeStringArray(payload?.keywords?.longTail),
    },
  };
}

async function generateStructuredResponse({ prompt, model }) {
  const response = await groqClient.chat.completions.create({
    model,
    temperature: 0.2,
    messages: [
      {
        role: "system",
        content:
          "Follow the requested tagged text format exactly. Do not include markdown, code fences, explanations, or commentary outside the requested tags.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return {
    output: response.choices?.[0]?.message?.content || "",
    response,
  };
}

function getTaggedValue(text, tag) {
  const match = String(text || "").match(new RegExp(`^${tag}:\\s*(.+)$`, "im"));
  return normalizeString(match?.[1], "");
}

function getTaggedBlock(text, startTag, endTag) {
  const source = String(text || "");
  const startRegex = new RegExp(`^${startTag}:\\s*$`, "im");
  const endRegex = endTag ? new RegExp(`^${endTag}:\\s*$`, "im") : null;
  const startMatch = source.match(startRegex);

  if (!startMatch || startMatch.index === undefined) {
    return "";
  }

  const blockStart = startMatch.index + startMatch[0].length;
  const rest = source.slice(blockStart);

  if (!endRegex) {
    return rest.trim();
  }

  const endMatch = rest.match(endRegex);

  if (!endMatch || endMatch.index === undefined) {
    return rest.trim();
  }

  return rest.slice(0, endMatch.index).trim();
}

function parsePipeList(value) {
  return normalizeString(value)
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseBulletList(block) {
  return String(block || "")
    .split("\n")
    .map((line) => line.replace(/^\s*-\s*/, "").trim())
    .filter(Boolean);
}

function parseOutlineBlock(block) {
  return String(block || "")
    .split("\n")
    .map((line) => line.replace(/^\s*-\s*/, "").trim())
    .filter(Boolean)
    .map((line) => {
      const [headingPart, pointsPart = ""] = line.split("::");
      return {
        heading: normalizeString(headingPart),
        keyPoints: parsePipeList(pointsPart),
      };
    })
    .filter((item) => item.heading);
}

function parseSectionBlock(block) {
  return String(block || "")
    .split("\n")
    .map((line) => line.replace(/^\s*-\s*/, "").trim())
    .filter(Boolean)
    .map((line) => {
      const [headingPart, contentPart = ""] = line.split("::");
      return {
        heading: normalizeString(headingPart),
        content: normalizeString(contentPart),
      };
    })
    .filter((item) => item.heading && item.content);
}

function parseFaqBlock(block) {
  return String(block || "")
    .split("\n")
    .map((line) => line.replace(/^\s*-\s*/, "").trim())
    .filter(Boolean)
    .map((line) => {
      const [questionPart, answerPart = ""] = line.split("::");
      return {
        question: normalizeString(questionPart),
        answer: normalizeString(answerPart),
      };
    })
    .filter((item) => item.question && item.answer);
}

function parseAutomationText(topic, model, text) {
  const payload = {
    summary: getTaggedValue(text, "SUMMARY"),
    targetAudience: getTaggedValue(text, "TARGET_AUDIENCE"),
    searchIntent: getTaggedValue(text, "SEARCH_INTENT"),
    seo: {
      title: getTaggedValue(text, "SEO_TITLE"),
      metaDescription: getTaggedValue(text, "META_DESCRIPTION"),
      primaryKeyword: getTaggedValue(text, "PRIMARY_KEYWORD"),
      secondaryKeywords: parsePipeList(getTaggedValue(text, "SECONDARY_KEYWORDS")),
      suggestedUrl: getTaggedValue(text, "SUGGESTED_URL"),
    },
    competitionSnapshot: {
      level: getTaggedValue(text, "COMPETITION_LEVEL"),
      score: getTaggedValue(text, "COMPETITION_SCORE"),
      reasoning: getTaggedValue(text, "COMPETITION_REASONING"),
      strengthsToBeat: parsePipeList(getTaggedValue(text, "STRENGTHS_TO_BEAT")),
      gapsToExploit: parsePipeList(getTaggedValue(text, "GAPS_TO_EXPLOIT")),
    },
    outline: parseOutlineBlock(getTaggedBlock(text, "OUTLINE", "ARTICLE_TITLE")),
    article: {
      title: getTaggedValue(text, "ARTICLE_TITLE"),
      introduction: getTaggedValue(text, "ARTICLE_INTRODUCTION"),
      sections: parseSectionBlock(getTaggedBlock(text, "ARTICLE_SECTIONS", "ARTICLE_CONCLUSION")),
      conclusion: getTaggedValue(text, "ARTICLE_CONCLUSION"),
      faq: parseFaqBlock(getTaggedBlock(text, "FAQ", "PUBLISHING_CHECKLIST")),
    },
    publishingChecklist: parseBulletList(getTaggedBlock(text, "PUBLISHING_CHECKLIST")),
  };

  return sanitizeAutomationPayload(topic, model, payload);
}

function parseCompetitionText(topic, model, text) {
  const payload = {
    competition: {
      level: getTaggedValue(text, "COMPETITION_LEVEL"),
      score: getTaggedValue(text, "COMPETITION_SCORE"),
      verdict: getTaggedValue(text, "VERDICT"),
      reasoning: getTaggedValue(text, "REASONING"),
      dominantIntent: getTaggedValue(text, "DOMINANT_INTENT"),
      estimatedContentDepth: getTaggedValue(text, "ESTIMATED_CONTENT_DEPTH"),
    },
    opportunities: parseBulletList(getTaggedBlock(text, "OPPORTUNITIES", "RISKS")),
    risks: parseBulletList(getTaggedBlock(text, "RISKS", "RECOMMENDED_ANGLES")),
    recommendedAngles: parseBulletList(getTaggedBlock(text, "RECOMMENDED_ANGLES", "PRIMARY_KEYWORD")),
    keywords: {
      primary: getTaggedValue(text, "PRIMARY_KEYWORD"),
      secondary: parsePipeList(getTaggedValue(text, "SECONDARY_KEYWORDS")),
      longTail: parsePipeList(getTaggedValue(text, "LONG_TAIL_KEYWORDS")),
    },
  };

  return sanitizeCompetitionPayload(topic, model, payload);
}

function buildAutomationPrompt(topic) {
  return `
You are an expert SEO strategist and blog automation engine.

Generate a complete blog automation package for the topic below.
Return only the following tagged format. Do not return JSON. Do not return markdown. Do not add commentary.

Topic: ${topic}

Format:
SUMMARY: one sentence
TARGET_AUDIENCE: one sentence
SEARCH_INTENT: one sentence
SEO_TITLE: one line
META_DESCRIPTION: one line
PRIMARY_KEYWORD: one line
SECONDARY_KEYWORDS: item 1 | item 2 | item 3
SUGGESTED_URL: one line
COMPETITION_LEVEL: Low or Medium or High
COMPETITION_SCORE: number from 1 to 100
COMPETITION_REASONING: one sentence
STRENGTHS_TO_BEAT: item 1 | item 2 | item 3
GAPS_TO_EXPLOIT: item 1 | item 2 | item 3
OUTLINE:
- Heading 1 :: point 1 | point 2 | point 3
- Heading 2 :: point 1 | point 2 | point 3
ARTICLE_TITLE: one line
ARTICLE_INTRODUCTION: one paragraph on one line
ARTICLE_SECTIONS:
- Section heading 1 :: section content on one line
- Section heading 2 :: section content on one line
ARTICLE_CONCLUSION: one paragraph on one line
FAQ:
- Question 1 :: Answer 1
- Question 2 :: Answer 2
PUBLISHING_CHECKLIST:
- checklist item 1
- checklist item 2

Rules:
- Keep score numeric from 1 to 100.
- Keep title and meta description publication-ready.
- Keep article sections readable and concise.
- Keep FAQ useful and specific to the topic.
- Keep all output professional and well formatted.
- Every tagged line must be present.
- Keep each section content on a single line.
`.trim();
}

function buildCompetitionPrompt(topic) {
  return `
You are an SEO competition analyst.

Analyze the blog-topic competition for the topic below.
Return only the following tagged format. Do not return JSON. Do not return markdown. Do not add commentary.

Topic: ${topic}

Format:
COMPETITION_LEVEL: Low or Medium or High
COMPETITION_SCORE: number from 1 to 100
VERDICT: one sentence
REASONING: one sentence
DOMINANT_INTENT: one sentence
ESTIMATED_CONTENT_DEPTH: one sentence
OPPORTUNITIES:
- item 1
- item 2
RISKS:
- item 1
- item 2
RECOMMENDED_ANGLES:
- item 1
- item 2
PRIMARY_KEYWORD: one line
SECONDARY_KEYWORDS: item 1 | item 2 | item 3
LONG_TAIL_KEYWORDS: item 1 | item 2 | item 3

Rules:
- Keep score numeric from 1 to 100.
- Keep verdict short and decisive.
- Keep output actionable and easy to consume.
- Keep keyword lists relevant and realistic for the topic.
- Every tagged line must be present.
`.trim();
}

export async function generateAutomatedBlog({ topic, model = "openai/gpt-oss-20b" }) {
  const result = await generateStructuredResponse({
    prompt: buildAutomationPrompt(topic),
    model,
  });

  return {
    model,
    automation: parseAutomationText(topic, model, result.output),
  };
}

export async function analyzeTopicCompetition({ topic, model = "openai/gpt-oss-20b" }) {
  const result = await generateStructuredResponse({
    prompt: buildCompetitionPrompt(topic),
    model,
  });

  return {
    model,
    analysis: parseCompetitionText(topic, model, result.output),
  };
}
