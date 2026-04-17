export function IconButton({ as: Comp = "button", className = "", children, ...props }) {
  return (
    <Comp
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition duration-200 hover:-translate-y-px hover:border-white/20 hover:text-white ${className}`}
      {...props}
    >
      {children}
    </Comp>
  );
}
