import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!username || !password) {
        toast.error("Please enter your username and password.");
        return;
      }

      setLoading(true);

      const data = await loginUser({
        username,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#101012] px-5">
      <div className="w-full max-w-md rounded-2xl border border-[#2A2A2E] bg-[#18181B] p-10 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
            <img
              src="/favicon.png"
              alt="Sunic"
              className="h-10 w-10 object-contain"
            />
          </div>

          <h1 className="text-3xl font-bold text-zinc-100">
            SUNIC
          </h1>

          <p className="mt-2 font-mono text-[11px] tracking-[0.12em] text-amber-400">
            INVENTORY MANAGEMENT SYSTEM
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-lg border border-[#2A2A2E] bg-[#0E0E10] px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-500/60"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-lg border border-[#2A2A2E] bg-[#0E0E10] px-4 py-3 pr-11 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-500/60"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-300"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-lg bg-amber-500 py-3 font-semibold text-[#241701] transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;