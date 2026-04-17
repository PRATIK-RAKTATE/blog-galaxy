import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";

function HeroCopy({ content, motionProps, isAuthenticated }) {
  return (
    <motion.div {...motionProps} className="mx-auto max-w-4xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-[rgb(75,70,96)] bg-[rgba(175, 111, 28, 0.5)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[rgba(255,255,255,0.72)]">
        <span className="h-2 w-2 rounded-full bg-[rgb(240,179,90)]" aria-hidden="true" />
        {content.eyebrow}
      </span>
      <h1 className="mt-8 text-5xl font-light leading-[0.96] tracking-[-0.06em] text-[rgb(255,255,255)] sm:text-6xl lg:text-[5.75rem]">
        You write. We{" "}
        <span className="relative text-[rgb(255,255,255)]">
          score it
          <svg className="absolute -bottom-3 left-0 h-5 w-full text-[rgba(255,255,255,0.35)]" viewBox="0 0 220 20" fill="none" aria-hidden="true">
            <path d="M4 15C56 5 118 4 216 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>{" "}
        for the page you want to win.
      </h1>
      <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-[rgba(255,255,255,0.48)]">{content.description}</p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {!isAuthenticated ? (
          <Button
            as="a"
            href={content.primaryCta.href}
            className="rounded-full border border-[rgb(76,73,94)] bg-[rgba(209, 99, 25, 0.72)] px-9 py-3.5 text-base text-[rgb(255,255,255)] shadow-[0_12px_36px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.04)]"
          >
            {content.primaryCta.label}
            <ArrowRight className="h-4 w-4 text-[rgb(240,179,90)]" />
          </Button>
        ) : null}
        <Button
          as="a"
          href={content.secondaryCta.href}
          variant="secondary"
          className="rounded-full border border-[rgb(76,73,94)] bg-[rgba(204, 101, 17, 0.68)] px-9 py-3.5 text-base text-[rgba(255,255,255,0.82)] shadow-[0_12px_36px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]"
        >
          {content.secondaryCta.label}
        </Button>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[rgba(255,255,255,0.52)]">
        <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[rgb(240,179,90)]" /> Live SERP preview</span>
        <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[rgb(240,179,90)]" /> Schema included</span>
        <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[rgb(240,179,90)]" /> Editable AI outlines</span>
      </div>
      <p className="mt-5 text-sm text-[rgba(255,255,255,0.36)]">{content.footnote}</p>
    </motion.div>
  );
}

export function Hero({ content, reducedMotion }) {
  const { isAuthenticated } = useAuth();
  const transition = reducedMotion ? {} : { transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } };
  const leftMotion = reducedMotion ? {} : { initial: { opacity: 0, y: 32 }, animate: { opacity: 1, y: 0 }, ...transition };

  return (
    <section className="px-4 pb-14 pt-8">
      <div className="relative mx-auto max-w-[var(--spacing-container)] overflow-hidden rounded-[2.8rem] bg-[rgb(0,0,0)] px-6 pb-14 pt-24 sm:px-10 lg:px-16 lg:pt-28">
        <div
          className="absolute inset-0 opacity-90"
          aria-hidden="true"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, rgba(245,224,198,0.14) 0, rgba(245,224,198,0.14) 1.5px, transparent 2.5px),
              radial-gradient(circle at 50% 12%, rgba(232,205,178,0.07), transparent 34%),
              linear-gradient(180deg, rgba(191,146,103,0.5) 0%, rgba(169,126,88,0.68) 16%, rgba(39,28,20,0.46) 48%, rgba(0,0,0,0.14) 100%),
              linear-gradient(180deg, rgba(201,160,120,0.42), transparent 18%),
              linear-gradient(180deg, rgba(0,0,0,0.12), rgba(154,114,77,0.2))
            `,
            backgroundSize: "20px 20px, 100% 100%, 100% 100%, 100% 100%, 100% 100%",
            backgroundPosition: "center, center, center, center, center",
          }}
        />
        <div className="absolute inset-x-[4%] top-18 h-px bg-[rgba(255,255,255,0.07)]" aria-hidden="true" />
        <div className="absolute bottom-0 left-[6%] right-[6%] h-40 rounded-t-[3rem] border border-[rgba(230, 116, 22, 0.68)] border-b-0" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(255,255,255,0.05),transparent_18%)]" aria-hidden="true" />

        <div className="relative">
          <HeroCopy content={content} motionProps={leftMotion} isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </section>
  );
}
