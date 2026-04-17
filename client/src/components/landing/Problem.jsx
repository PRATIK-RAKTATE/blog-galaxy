import { Reveal } from "../ui/Reveal";

export function Problem({ lines, reducedMotion }) {
  const [lineOne, lineTwo, lineThree] = lines;

  return (
    <section className="relative overflow-hidden px-4 py-[var(--spacing-section)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_14%,rgba(117,43,7,0.16),transparent_30%)]" aria-hidden="true" />
      <div className="mx-auto max-w-[var(--spacing-container)]">
        <Reveal reducedMotion={reducedMotion} className="flex justify-center">
          <span className="rounded-full border border-white/8 bg-white/[0.02] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/42">
            02 / The problem
          </span>
        </Reveal>

        <Reveal reducedMotion={reducedMotion} delay={0.08} className="mx-auto mt-10 max-w-[78rem] text-center">
          <h2 className="font-sans text-[clamp(3.25rem,7vw,7.4rem)] font-light leading-[0.92] tracking-[-0.06em] text-white">
            <span className="block">{lineOne.replace(".", "")}</span>
            <span className="mt-2 block">{lineTwo.replace(".", "")}</span>
            <span className="mt-5 inline-block border border-accent-400/35 bg-accent-400/12 px-4 py-2 text-accent-400 shadow-[0_0_0_1px_rgba(240,179,90,0.06)] sm:px-6">
              {lineThree.replace(".", "")}
            </span>
          </h2>
        </Reveal>
      </div>
    </section>
  );
}
