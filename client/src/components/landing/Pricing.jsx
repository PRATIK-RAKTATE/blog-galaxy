import { useState } from "react";
import { Check } from "lucide-react";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "./SectionHeading";

export function Pricing({ content, reducedMotion }) {
  const [billing, setBilling] = useState("Monthly");

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="px-4 py-[var(--spacing-section)]">
      <div className="mx-auto max-w-[var(--spacing-container)]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            number="05"
            eyebrow="Pricing"
            title="Plans that keep the workflow honest."
            description="You can see what is missing from each plan. That matters more than inflated feature counts."
            reducedMotion={reducedMotion}
          />
          <Reveal reducedMotion={reducedMotion} delay={0.08} className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
            {content.toggle.map((option) => (
              <button
                key={option}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${billing === option ? "bg-accent-400 text-ink-950" : "text-white/60"}`}
                onClick={() => setBilling(option)}
              >
                {option}
              </button>
            ))}
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 xl:grid-cols-3">
          {content.tiers.map((tier, index) => (
            <Reveal key={tier.name} reducedMotion={reducedMotion} delay={index * 0.08}>
              <div className={`rounded-[var(--radius-card)] border bg-linear-to-br from-white/[0.05] to-white/[0.02] p-8 shadow-[var(--shadow-glow)] backdrop-blur-xl ${tier.featured ? "relative border-accent-400/40 before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-accent-400/80 before:to-transparent before:content-['']" : "border-white/8"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white">{tier.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/58">{tier.description}</p>
                </div>
                {tier.featured ? <span className="rounded-full border border-accent-400/30 bg-accent-400/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-400">Popular</span> : null}
              </div>
              <div className="mt-6 font-display text-5xl text-white">
                {billing === "Monthly" ? tier.monthly : tier.annual}
                <span className="ml-2 font-sans text-sm font-medium text-white/45">/mo</span>
              </div>
              <div className="mt-8 space-y-3">
                {tier.included.map((item) => (
                  <p key={item} className="flex items-center gap-3 text-sm text-white/68">
                    <Check className="h-4 w-4 text-accent-400" />
                    {item}
                  </p>
                ))}
              </div>
              <p className="mt-8 border-t border-white/8 pt-6 text-sm leading-7 text-white/48">{tier.excluded}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
