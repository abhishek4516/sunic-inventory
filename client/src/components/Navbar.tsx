import { Bell, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const hasNotifications = true;
  const { theme, toggleTheme } = useTheme();

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
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-md border border-border bg-background p-2 text-muted-foreground transition-all duration-300 hover:bg-accent hover:text-foreground"
        >
          {theme === "dark" ? (
            <Sun size={18} strokeWidth={1.75} />
          ) : (
            <Moon size={18} strokeWidth={1.75} />
          )}
        </button>

        <button
          aria-label="Notifications"
          className="relative rounded-md p-2 text-muted-foreground transition hover:bg-accent hover:text-foreground"
        >
          <Bell size={19} strokeWidth={1.75} />

          {hasNotifications && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-card bg-amber-500" />
          )}
        </button>

        <div className="h-8 w-px bg-border" />

        <div className="flex items-center gap-3">
          <div className="hidden text-right md:block">
            <p className="text-sm font-semibold leading-tight text-foreground">
              Admin
            </p>

            <p className="text-xs leading-tight text-muted-foreground">
              admin@sunic.com
            </p>
          </div>

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-amber-500/30 bg-amber-500/10 font-mono text-sm font-bold text-amber-600 dark:text-amber-400">
            A
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;