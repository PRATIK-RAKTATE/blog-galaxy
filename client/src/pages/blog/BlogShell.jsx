import { PenSquare, Plus, Sparkles } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/Button";
import { Logo } from "../../components/ui/Logo";

const navLinkClassName =
  "rounded-full px-4 py-2 text-sm font-medium transition duration-200 hover:bg-white/[0.05] hover:text-white";

export function BlogShell({ title, description, actions, children }) {
  const { user, isAuthenticated, clearSession } = useAuth();

  return (
    <div className="site-shell min-h-screen">
      <div className="site-shell__content">
        <header className="px-4 pt-6">
          <nav
            className="mx-auto flex max-w-[var(--spacing-container)] flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-black/55 px-5 py-4 shadow-[0_24px_64px_rgba(0,0,0,0.42)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between"
            aria-label="Blog"
          >
            <div className="flex items-center justify-between gap-4">
              <Link to="/" className="flex items-center gap-3">
                <Logo className="h-10 w-10" />
                <span>
                  <span className="block text-sm font-semibold text-white">BlogGalaxy</span>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-info-400/80">
                    Traditional blog
                  </span>
                </span>
              </Link>
              <Button
                as={Link}
                to="/blogs/new"
                className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] lg:hidden"
              >
                <Plus className="h-4 w-4" />
                New
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-white/70">
              <NavLink
                to="/blogs"
                end
                className={({ isActive }) =>
                  `${navLinkClassName} ${isActive ? "bg-white/[0.08] text-white" : "text-white/68"}`
                }
              >
                Explore
              </NavLink>
              <NavLink
                to="/blogs/new"
                className={({ isActive }) =>
                  `${navLinkClassName} ${isActive ? "bg-white/[0.08] text-white" : "text-white/68"}`
                }
              >
                Write
              </NavLink>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                <Sparkles className="h-4 w-4 text-accent-400" />
                {isAuthenticated ? user?.name || user?.email || "Session active" : "Guest mode"}
              </span>
              {isAuthenticated ? (
                <Button
                  variant="ghost"
                  onClick={clearSession}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-white/80"
                >
                  Sign out
                </Button>
              ) : (
                <Button
                  as={Link}
                  to="/login"
                  variant="ghost"
                  className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-white/80"
                >
                  Sign in
                </Button>
              )}
              <Button as={Link} to="/blogs/new" className="hidden rounded-full px-6 py-3 lg:inline-flex">
                <PenSquare className="h-4 w-4" />
                Create post
              </Button>
            </div>
          </nav>
        </header>

        <main className="px-4 pb-16 pt-8">
          <section className="mx-auto max-w-[var(--spacing-container)]">
            <div className="grid gap-6 rounded-[2rem] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-6 shadow-[var(--shadow-glow)] backdrop-blur-xl lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:p-8">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-info-400/80">
                  Blog workspace
                </p>
                <h1 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
                  {title}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
                  {description}
                </p>
              </div>
              {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
            </div>
            <div className="mt-8">{children}</div>
          </section>
        </main>
      </div>
    </div>
  );
}
