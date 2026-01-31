import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { loginUser } from "../api/auth";
import { notify } from "../components/ui/toast";
import { toast } from "react-toastify";

type LoginFormState = {
  email: string;
  password: string;
};

function getErrorMessage(err: unknown): string {
  // Upgrade this if you use axios (err.response.data.message, etc.)
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  return "Login failed. Please try again.";
}

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginFormState>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const email = form.email.trim();
    const password = form.password;

    if (!email || !password) {
      notify.error("Email and password are required.");
      return;
    }

    setIsSubmitting(true);
    const loadingId = toast.loading("Signing you in...");

    try {
      await loginUser({ email, password });

      toast.update(loadingId, {
        render: "Login successful ✅",
        type: "success",
        isLoading: false,
        autoClose: 1800,
      });

      navigate("/", { replace: true });
    } catch (err: unknown) {
      const message = getErrorMessage(err);
      console.error("LOGIN_FAILURE_DETAIL:", err);

      toast.update(loadingId, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-1/2 max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Go to Home</span>
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Welcome Back
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2 pr-10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 disabled:opacity-60 transition shadow-md"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}
