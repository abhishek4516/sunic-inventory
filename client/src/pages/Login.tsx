import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
  };

  const switchMode = (toLogin: boolean) => {
    if (toLogin === isLogin) return;
    clearForm();
    setIsLogin(toLogin);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (isLogin) {
        if (!email || !password) {
          toast.error("Fill all fields");
          return;
        }

        const data = await loginUser({ email, password });

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        if (!name || !email || !password || !confirmPassword) {
          toast.error("Fill all fields");
          return;
        }

        const data = await registerUser({
          name,
          email,
          password,
          confirmPassword,
        });

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        toast.success("Registration successful");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#101012] px-5">
      <div className="relative h-[520px] w-full max-w-3xl overflow-hidden rounded-2xl border border-[#2A2A2E] bg-[#18181B] shadow-2xl md:h-[500px]">
        {/* Sign in panel - fixed left half */}
        <div
          className={`absolute inset-y-0 left-0 flex w-full flex-col justify-center gap-3.5 px-8 py-10 transition-opacity duration-300 md:w-1/2 md:px-12 ${
            isLogin ? "opacity-100 delay-300" : "pointer-events-none opacity-0 md:opacity-0"
          } ${!isLogin ? "hidden md:flex" : "flex"}`}
        >
          <p className="font-mono text-[11px] tracking-[0.12em] text-amber-400">
            ACCESS TERMINAL
          </p>
          <h2 className="mb-1 text-2xl font-bold text-zinc-100">Sign in</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-lg border border-[#2A2A2E] bg-[#0E0E10] px-3.5 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-500/60"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-lg border border-[#2A2A2E] bg-[#0E0E10] px-3.5 py-3 pr-11 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-500/60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-2 rounded-lg bg-amber-500 py-3 text-sm font-semibold text-[#241701] transition hover:bg-amber-400 disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Sign in"}
          </button>

          <button
            onClick={() => switchMode(false)}
            className="mt-1 text-xs text-zinc-500 hover:text-amber-400 md:hidden"
          >
            Need an account? Sign up
          </button>
        </div>

        {/* Sign up panel - fixed right half */}
        <div
          className={`absolute inset-y-0 right-0 flex w-full flex-col justify-center gap-3 overflow-y-auto px-8 py-10 transition-opacity duration-300 md:w-1/2 md:px-12 ${
            !isLogin ? "opacity-100 delay-300" : "pointer-events-none opacity-0"
          } ${isLogin ? "hidden md:flex" : "flex"}`}
        >
          <p className="font-mono text-[11px] tracking-[0.12em] text-amber-400">
            NEW OPERATOR
          </p>
          <h2 className="mb-1 text-2xl font-bold text-zinc-100">Create account</h2>

          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-lg border border-[#2A2A2E] bg-[#0E0E10] px-3.5 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-500/60"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-lg border border-[#2A2A2E] bg-[#0E0E10] px-3.5 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-500/60"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-lg border border-[#2A2A2E] bg-[#0E0E10] px-3.5 py-3 pr-11 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-500/60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-lg border border-[#2A2A2E] bg-[#0E0E10] px-3.5 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-500/60"
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-1 rounded-lg bg-amber-500 py-3 text-sm font-semibold text-[#241701] transition hover:bg-amber-400 disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Create account"}
          </button>

          <button
            onClick={() => switchMode(true)}
            className="mt-1 text-xs text-zinc-500 hover:text-amber-400 md:hidden"
          >
            Already have an account? Sign in
          </button>
        </div>

        {/* Sliding door overlay - hidden on small screens, shown from md up */}
        <div
          className="absolute inset-y-0 left-0 z-10 hidden w-1/2 transition-transform duration-[600ms] md:block"
          style={{
            transform: isLogin ? "translateX(100%)" : "translateX(0%)",
            transitionTimingFunction: "cubic-bezier(0.65, 0, 0.35, 1)",
          }}
        >
          <div
            className="relative flex h-full flex-col items-center justify-center gap-4 px-10 text-center"
            style={{
              backgroundImage:
                "linear-gradient(155deg, #F5A524 0%, #B5730A 100%), repeating-linear-gradient(180deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 2px, transparent 2px, transparent 18px)",
              backgroundBlendMode: "normal, multiply",
            }}
          >
            <div
              className="absolute inset-y-0 w-2.5 opacity-90"
              style={{
                [isLogin ? "left" : "right"]: 0,
                backgroundImage:
                  "repeating-linear-gradient(45deg, #14110B 0, #14110B 6px, #F5A524 6px, #F5A524 12px)",
              } as React.CSSProperties}
            />

            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#241701] text-3xl font-bold text-amber-400">
              S
            </div>

            <h1 className="text-[26px] font-bold tracking-wide text-[#241701]">SUNIC</h1>
            <p className="font-mono text-[11px] tracking-[0.1em] text-[#241701]/75">
              INVENTORY MANAGEMENT SYSTEM
            </p>

            <p className="max-w-[220px] text-[13.5px] text-[#241701]/85">
              {isLogin
                ? "New to the floor? Set up your operator account to start tracking stock."
                : "Already on the system? Sign back in to pick up where you left off."}
            </p>

            <button
              onClick={() => switchMode(!isLogin)}
              className="mt-1 rounded-lg border-[1.5px] border-[#241701] px-7 py-2.5 text-[13.5px] font-semibold text-[#241701] transition hover:bg-[#241701]/10"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;