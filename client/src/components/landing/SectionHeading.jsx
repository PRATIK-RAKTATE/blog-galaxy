import { Reveal } from "../ui/Reveal";

export function SectionHeading({ number, eyebrow, title, description, align = "left", reducedMotion }) {
  const alignment = align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-xl";

  return (
    <Reveal reducedMotion={reducedMotion} className={alignment}>
      <div className={`mb-5 flex ${align === "center" ? "justify-center" : "justify-start"}`}>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
          <span className="h-2 w-2 rounded-full bg-accent-400" aria-hidden="true" />
          {number} / {eyebrow}
        </span>
      </div>
      <h2 className="font-display text-4xl leading-tight text-white md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-white/60">{description}</p> : null}
    </Reveal>
  );
}
