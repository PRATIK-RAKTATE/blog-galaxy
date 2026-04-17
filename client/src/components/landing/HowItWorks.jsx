import { motion } from "framer-motion";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "./SectionHeading";

function StepMock({ index, reducedMotion }) {
  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <motion.div {...motionProps} className="mb-6 h-24 rounded-2xl border border-white/8 bg-ink-950/70 p-4">
      {index === 0 ? <motion.div animate={reducedMotion ? {} : { x: [0, 44, 60] }} transition={{ duration: 0.8, ease: "easeOut" }} className="h-10 w-20 rounded-xl border border-white/8 bg-white/[0.04]" /> : null}
      {index === 1 ? (
        <div className="space-y-2">
          {[44, 70, 58].map((width) => (
            <motion.div
              key={width}
              animate={reducedMotion ? {} : { width: `${width}%` }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="h-3 rounded-full bg-accent-400/70"
            />
          ))}
        </div>
      ) : null}
      {index === 2 ? (
        <motion.div
          animate={reducedMotion ? {} : { scale: [1, 0.97, 1], backgroundColor: ["rgba(240,179,90,.18)", "rgba(217,138,43,.55)", "rgba(240,179,90,.18)"] }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="ml-auto flex h-10 w-28 items-center justify-center rounded-xl border border-accent-400/35 bg-accent-400/20 text-sm font-semibold text-accent-400"
        >
          Publish
        </motion.div>
      ) : null}
    </motion.div>
  );
}

export function HowItWorks({ steps, reducedMotion }) {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="px-4 py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--spacing-container)]">
        <SectionHeading
          number="04"
          eyebrow="How it works"
          title="Three moves from topic to finished post."
          description="The workflow stays visible. The value is in what gets easier before you hit publish."
          reducedMotion={reducedMotion}
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.number} reducedMotion={reducedMotion} delay={index * 0.08}>
              <div className="relative rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-[var(--shadow-glow)] backdrop-blur-xl before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-accent-400/80 before:to-transparent before:content-['']">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">{step.number}</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white/60">{step.description}</p>
              <StepMock index={index} reducedMotion={reducedMotion} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
