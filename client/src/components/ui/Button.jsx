const variants = {
  primary:
    "border-transparent bg-linear-to-r from-accent-400 to-accent-500 text-ink-950 shadow-[0_0_28px_rgba(217,138,43,0.28)] hover:-translate-y-px",
  secondary:
    "border-white/15 bg-white/[0.03] text-ivory-100 hover:-translate-y-px hover:border-white/25",
  ghost: "border-transparent bg-transparent text-white/70 hover:text-white",
};

export function Button({ as: Comp = "button", variant = "primary", className = "", ...props }) {
  return (
    <Comp
      className={`inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] border px-5 py-3 text-sm font-semibold transition duration-200 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
