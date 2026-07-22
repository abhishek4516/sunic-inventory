import { LogOut, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import NotificationBell from "./NotificationBell";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const name = user.name || "Admin";
  const email = user.email || "admin@sunic.com";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card px-6 transition-colors duration-300">
      <div className="leading-tight">
        <h1 className="text-lg font-bold tracking-tight text-foreground">
          Sunic Inventory
        </h1>

        <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
          INVENTORY OS
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-full border border-border bg-background p-2 text-muted-foreground transition-all duration-300 hover:bg-accent hover:text-foreground"
        >
          {theme === "dark" ? (
            <Sun size={18} strokeWidth={1.75} />
          ) : (
            <Moon size={18} strokeWidth={1.75} />
          )}
        </button>

        {/* Notification Bell */}
        <NotificationBell />

        {/* Logout */}
        <button
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
          className="rounded-full border border-border bg-background p-2 text-muted-foreground transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut size={18} strokeWidth={1.75} />
        </button>

        <div className="h-8 w-px bg-border" />

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold leading-tight text-foreground">
              {name}
            </p>

            <p className="text-xs leading-tight text-muted-foreground">
              {email}
            </p>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
            {name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;