import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useAuth } from "../context/AuthContext";

const contentByMode = {
  login: {
    title: "Sign in and get back to ranking work.",
    description: "Use your account to open the workspace, drafts, and content scoring history.",
    cta: "Sign in",
    alternateText: "Need an account?",
    alternateHref: "/signup",
    alternateLabel: "Create one",
  },
  signup: {
    title: "Create your account and start with a real draft.",
    description: "Set up your workspace, connect your CMS, and test the SERP-first flow.",
    cta: "Create account",
    alternateText: "Already have an account?",
    alternateHref: "/login",
    alternateLabel: "Sign in",
  },
};

export function AuthPage({ mode }) {
  const page = contentByMode[mode];
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login, register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    setError("");

    try {
      if (mode === "signup") {
        await register({ name, email, password });
      } else {
        await login({ email, password });
      }

      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo, { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="site-shell min-h-screen">
      <main className="site-shell__content min-h-screen px-4 py-10">
        <div className="mx-auto grid max-w-[var(--spacing-container)] gap-8 lg:grid-cols-[1fr_460px] lg:items-center">
          <section className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/65">
              <span className="h-2 w-2 rounded-full bg-accent-400" aria-hidden="true" />
              {mode === "signup" ? "Create account" : "Welcome back"}
            </span>
            <h1 className="mt-6 font-display text-5xl leading-tight text-white sm:text-6xl">{page.title}</h1>
            <p className="mt-5 text-lg leading-8 text-white/60">{page.description}</p>
            <p className="mt-8 text-sm text-white/44">
              You keep the same session in the landing page nav, so logged-in users stop seeing the login button.
            </p>
          </section>

          <div className="relative rounded-[var(--radius-card)] border border-white/8 bg-linear-to-br from-white/[0.05] to-white/[0.02] p-8 shadow-[var(--shadow-glow)] backdrop-blur-xl before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-accent-400/80 before:to-transparent before:content-[''] sm:p-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
              {mode === "signup" ? (
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/72" htmlFor="name">
                    Name
                  </label>
                  <Input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Pratik" />
                </div>
              ) : null}
              <div>
                <label className="mb-2 block text-sm font-medium text-white/72" htmlFor="email">
                  Email
                </label>
                <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white/72" htmlFor="password">
                  Password
                </label>
                <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimum 6 characters" />
              </div>
              {error ? <p className="text-sm text-red-300">{error}</p> : null}
              <Button type="submit" className="w-full" disabled={pending}>
                {pending ? "Please wait" : page.cta}
              </Button>
            </form>
            <p className="mt-6 text-sm text-white/50">
              {page.alternateText} <Link className="text-accent-400" to={page.alternateHref}>{page.alternateLabel}</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
