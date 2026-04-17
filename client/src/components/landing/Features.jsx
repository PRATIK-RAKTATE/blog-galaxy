import { motion } from "framer-motion";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "./SectionHeading";

function FeatureCard({ feature, index, motionProps }) {
  const Icon = feature.icon;
  const highlight = index === 0 || index === 3;

    return (
    <motion.article {...motionProps}>
      <div
        className={`group h-full overflow-hidden rounded-[var(--radius-card)] border bg-linear-to-br from-white/[0.05] to-white/[0.02] p-0 shadow-[var(--shadow-glow)] backdrop-blur-xl transition duration-200 hover:-translate-y-px hover:border-white/15 ${highlight ? "relative border-white/8 before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-accent-400/80 before:to-transparent before:content-['']" : "border-white/8"} ${index === 0 ? "xl:col-span-2" : ""}`}
      >
        <div className="flex h-full flex-col justify-between gap-8 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/42">
                {String(index + 1).padStart(2, "0")} / {feature.eyebrow}
              </p>
              <h3 className="mt-4 max-w-sm text-2xl font-semibold leading-tight text-white">
                {feature.title}
              </h3>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-accent-400/10 text-accent-400">
              <Icon className="h-5 w-5" />
            </div>
          </div>

          <div className={`grid gap-6 ${index === 0 ? "lg:grid-cols-[1.3fr_.7fr]" : ""}`}>
            <p className="max-w-md text-sm leading-7 text-white/60">{feature.description}</p>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent-400">What changes</p>
              <p className="mt-3 text-sm leading-7 text-white/72">{feature.outcome}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Features({ items, reducedMotion }) {
  const container = reducedMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-100px" },
        variants: { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } },
      };
  const itemMotion = reducedMotion
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 24 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
        },
      };

  return (
    <section id="features" aria-labelledby="features-heading" className="px-4 py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--spacing-container)]">
        <div className="grid gap-10 xl:grid-cols-[.9fr_1.1fr] xl:items-end">
          <SectionHeading
            number="03"
            eyebrow="Features"
            title="Specific tools for the parts of SEO writing that usually break."
            description="No filler features. Each one removes work that usually happens after the draft should already be done."
            reducedMotion={reducedMotion}
          />
          <Reveal reducedMotion={reducedMotion} delay={0.08}>
            <div className="rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-[var(--shadow-glow)] backdrop-blur-xl">
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/42">Draft quality</p>
                <p className="mt-3 font-display text-4xl text-white">Intent first</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/42">Publish flow</p>
                <p className="mt-3 font-display text-4xl text-white">Schema ready</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/42">Editorial control</p>
                <p className="mt-3 font-display text-4xl text-white">Still yours</p>
              </div>
            </div>
            </div>
          </Reveal>
        </div>
        <motion.div {...container} className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} motionProps={itemMotion} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
