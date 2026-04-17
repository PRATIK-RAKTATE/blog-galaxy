import { motion } from "framer-motion";

const DEFAULT_EASE = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  as = "div",
  className = "",
  reducedMotion = false,
  delay = 0,
  distance = 24,
  duration = 0.6,
  once = true,
  amount = 0.2,
}) {
  const MotionTag = motion.create(as);
  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: distance },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once, amount },
        transition: { duration, delay, ease: DEFAULT_EASE },
      };

  return (
    <MotionTag {...motionProps} className={className}>
      {children}
    </MotionTag>
  );
}
