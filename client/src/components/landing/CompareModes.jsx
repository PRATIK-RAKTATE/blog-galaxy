import { Bot, PenSquare, Sparkles } from "lucide-react";
import { Reveal } from "../ui/Reveal";

const modeDeck = [
  {
    icon: Bot,
    tag: "LIVE",
    tone: "from-[#123123] via-[#0f1e17] to-[#07120d]",
    orb: "bg-[#4de08d]",
    chips: ["Fast first draft", "Stable SERP", "Editable outline"],
    align: "justify-start",
  },
  {
    icon: Sparkles,
    tag: "GUIDED",
    tone: "from-[#3f2207] via-[#1a120a] to-[#0f0906]",
    orb: "bg-[#ffab3d]",
    chips: ["SERP scoring", "Schema ready", "Link suggestions"],
    align: "justify-center",
  },
  {
    icon: PenSquare,
    tag: "PRO",
    tone: "from-[#0d1528] via-[#0b0f1b] to-[#070912]",
    orb: "bg-[#8b9dff]",
    chips: ["Original research", "Product nuance", "Strong voice"],
    align: "justify-end",
  },
];

function buildCards(items) {
  const source = [
    items[0] ?? {
      title: "When to use AI mode",
      body: "Start with AI when speed matters and the brief is already clear. Keep the outline editable so the draft stays useful instead of becoming final too early.",
    },
    {
      title: "Best used together",
      body: "The practical workflow is hybrid: generate the boring parts fast, then tighten claims, structure, and links where judgment matters.",
    },
    items[1] ?? {
      title: "When to write yourself",
      body: "Write manually when you need stronger opinions, product context, or first-hand evidence. Let the SEO layer support the draft without replacing your thinking.",
    },
  ];

  return source.map((item, index) => ({ ...item, ...modeDeck[index] }));
}

function ModeCard({ item, reducedMotion, delay }) {
  const Icon = item.icon;

  return (
    <Reveal reducedMotion={reducedMotion} delay={delay}>
      <article className="overflow-hidden rounded-[1.7rem] bg-[#120d0d]/80 p-3 shadow-[0_28px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        <div className="rounded-[1.35rem] border border-white/8 bg-linear-to-br p-4 md:p-5">
          <div className="flex items-center gap-2 text-white/60">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff7b72]" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd4a]" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#00c951]" aria-hidden="true" />
          </div>

          <div className={`mt-4 flex ${item.align}`}>
            <span className="rounded-full border border-white/15 bg-white/95 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-[#ff4b4b] uppercase">
              {item.tag}
            </span>
          </div>

          <div className={`mt-4 rounded-[1.2rem] border border-white/8 bg-linear-to-br ${item.tone} p-5`}>
            <div className="flex items-start justify-between gap-4">
              <div className="max-w-[70%]">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">Mode card</p>
                <h3 className="mt-3 text-2xl font-semibold leading-tight text-white">{item.title}</h3>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.orb} text-black shadow-[0_0_24px_rgba(255,255,255,0.12)]`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="relative mt-8 overflow-hidden rounded-[1rem] bg-black/25 px-4 py-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" aria-hidden="true" />
              <div className="absolute -right-8 top-4 h-20 w-20 rounded-full bg-white/8 blur-2xl" aria-hidden="true" />
              <div className="relative flex min-h-[12rem] flex-col justify-between">
                <p className="max-w-sm text-sm leading-7 text-white/72">{item.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.chips.map((chip) => (
                    <span key={chip} className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/58">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function CompareModes({ items, reducedMotion }) {
  const cards = buildCards(items);

  return (
    <section aria-labelledby="modes-heading" className="relative overflow-hidden px-4 py-[var(--spacing-section)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(111,41,6,0.32),transparent_36%),linear-gradient(180deg,#030303_0%,#050505_100%)]" aria-hidden="true" />
      <div className="absolute inset-x-[12%] top-18 h-px bg-white/6" aria-hidden="true" />
      <div className="absolute left-[14%] top-26 h-[22rem] w-px bg-white/6" aria-hidden="true" />
      <div className="absolute right-[16%] top-26 h-[22rem] w-px bg-white/6" aria-hidden="true" />
      <div className="absolute inset-x-[18%] top-26 h-[20rem] bg-[linear-gradient(135deg,transparent_0,transparent_28%,rgba(255,255,255,0.05)_28.2%,transparent_28.7%,transparent_71.3%,rgba(255,255,255,0.05)_71.5%,transparent_72%)]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[var(--spacing-container)]">
        <Reveal reducedMotion={reducedMotion} className="mx-auto max-w-4xl text-center">
          <div className="flex justify-center">
            <span className="inline-flex items-center rounded-full border border-accent-400/25 bg-accent-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-400">
              04 / Modes
            </span>
          </div>
          <h2 id="modes-heading" className="mx-auto mt-6 max-w-4xl font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Level Up Your Writing Flow With Expert-Led Modes
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/58">
            Pick the mode that fits the draft. Move fast when the structure is obvious, slow down when the thinking is the product.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-7 xl:grid-cols-3">
          {cards.map((item, index) => (
            <ModeCard key={item.title} item={item} reducedMotion={reducedMotion} delay={index * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
