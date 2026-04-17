import { Reveal } from "../ui/Reveal";

export function TrustStrip({ content, reducedMotion }) {
  return (
    <section className="px-4 py-10">
      <div className="mx-auto max-w-[var(--spacing-container)]">
        <Reveal reducedMotion={reducedMotion}>
          <div className="rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-5 shadow-[var(--shadow-glow)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm uppercase tracking-[0.18em] text-white/50">{content.title}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-white/68 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-end">
              {content.items.map((item) => (
                <span key={item} className="rounded-full border border-white/8 px-4 py-2 text-center">{item}</span>
              ))}
            </div>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
