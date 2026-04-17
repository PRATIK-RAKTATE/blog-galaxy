export function Card({ as: Comp = "div", className = "", accent = false, children, ...props }) {
  return (
    <Comp
      className={`rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-[var(--shadow-glow)] backdrop-blur-xl ${accent ? "relative before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-accent-400/80 before:to-transparent before:content-['']" : ""} ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
