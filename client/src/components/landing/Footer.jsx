import { useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Logo } from "../ui/Logo";
import { Reveal } from "../ui/Reveal";

export function Footer({ content, reducedMotion }) {
  const [hovered, setHovered] = useState(false);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const glowX = useSpring(pointerX, { stiffness: 120, damping: 20 });
  const glowY = useSpring(pointerY, { stiffness: 120, damping: 20 });
  const titleX = useTransform(glowX, (value) => (reducedMotion ? 0 : (value - 50) * 0.18));
  const titleY = useTransform(glowY, (value) => (reducedMotion ? 0 : (value - 50) * 0.08));
  const glow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(240,179,90,0.18), rgba(240,179,90,0.08) 18%, transparent 42%)`;
  const socials = [
    { name: "Twitter", href: "https://twitter.com", icon: Twitter },
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  ];

  function handlePointerMove(event) {
    if (reducedMotion) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;

    pointerX.set(Math.max(0, Math.min(100, x)));
    pointerY.set(Math.max(0, Math.min(100, y)));
  }

  return (
    <footer
      className="relative overflow-hidden px-4 pb-12 pt-8"
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300"
        style={{ backgroundImage: glow, opacity: hovered && !reducedMotion ? 1 : 0 }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_14%),linear-gradient(90deg,transparent,rgba(255,255,255,0.03)_50%,transparent)]" aria-hidden="true" />

      <div className="relative mx-auto max-w-[var(--spacing-container)]">
        <Reveal reducedMotion={reducedMotion}>
          <motion.div style={{ x: titleX, y: titleY }} className="pointer-events-none select-none">
            <div className="overflow-hidden text-center font-sans text-[clamp(4rem,19vw,15rem)] font-semibold leading-none tracking-[-0.08em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.1)]">
              BlogGalaxy
            </div>
          </motion.div>
        </Reveal>

        <div className="mt-10 grid gap-14 pb-6 lg:grid-cols-[1.2fr_2fr] lg:items-start">
          <Reveal reducedMotion={reducedMotion} delay={0.06}>
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Logo className="h-14 w-14 shrink-0" />
                <p className="max-w-xs text-sm leading-7 text-white/56">{content.blurb}</p>
              </div>
              <div className="flex gap-3">
                {socials.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      aria-label={item.name}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/72 transition duration-300 hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-4">
            {content.columns.map((column, index) => (
              <Reveal key={column.title} reducedMotion={reducedMotion} delay={0.1 + index * 0.06}>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white">{column.title}</h2>
                  <ul className="mt-6 space-y-4 text-sm text-white/52">
                    {column.links.map((link) => (
                      <li key={link}>
                        <a href="/" className="transition duration-200 hover:text-white">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal reducedMotion={reducedMotion} delay={0.22}>
          <div className="border-t border-white/8 pt-5 text-sm text-white/38">
            © 2026 BlogGalaxy. All rights reserved.
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
