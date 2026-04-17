export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-[var(--radius-button)] border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ivory-100 outline-none transition placeholder:text-white/35 focus:border-accent-400/80 ${className}`}
      {...props}
    />
  );
}
