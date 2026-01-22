import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft, Home } from "lucide-react";

type LoginFormState = {
  email: string;
  password: string;
};

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise((res) => setTimeout(res, 1200));
      navigate("/");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">

      <div className="w-1/2 max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
      {/* Go to Home Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="pl-[20px] group-hover:-translate-x-1 transition-transform" />
          <span>Go to Home</span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
          Welcome Back
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mt-2">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="mt-8">
          {/* Email Field */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-8"> {/* Added significant margin-bottom here for Y-axis space */}
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2 pr-10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 text-center mb-4">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 disabled:opacity-60 transition shadow-md"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
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