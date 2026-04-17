import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

export function Nav({ items, cta }) {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-4 pt-6">
      <nav
        className="mx-auto flex max-w-[var(--spacing-container)] items-center justify-between gap-4"
        aria-label="Primary"
      >
        <a href="#" className="flex items-center gap-3">
          <Logo className="h-10 w-10" />
          <span>
            <span className="block text-sm font-semibold text-white">BlogGalaxy</span>
            <span className="block text-[10px] uppercase tracking-[0.22em] text-info-400/80">SERP workspace</span>
          </span>
        </a>

        <div
          className={`hidden items-center gap-1 rounded-full border px-3 py-2 shadow-[0_12px_36px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl md:flex ${scrolled ? "border-[#57556c] bg-black/78" : "border-[#4c495e] bg-black/72"}`}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-white/68 transition duration-200 hover:bg-white/[0.05] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <span className="hidden rounded-full border border-[#4c495e] bg-black/72 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70 shadow-[0_12px_36px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)] sm:inline-flex">
              {user?.name || user?.email || "Logged in"}
            </span>
          ) : (
            <Button as={Link} to="/login" variant="ghost" className="hidden rounded-full border border-[#4c495e] bg-black/72 px-5 py-3 text-sm text-white/82 shadow-[0_12px_36px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-white/[0.04] sm:inline-flex">
              Sign in
            </Button>
          )}
          {!isAuthenticated ? (
            <Button
              as={Link}
              to={cta.href}
              className="rounded-full border border-[#4c495e] bg-black/72 px-6 py-3 text-sm text-white shadow-[0_12px_36px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.08)] hover:bg-white/[0.04]"
            >
              {cta.label}
              <ArrowRight className="h-4 w-4 text-accent-400" />
            </Button>
          ) : null}
        </div>
      </nav>
    </header>
  );
}
