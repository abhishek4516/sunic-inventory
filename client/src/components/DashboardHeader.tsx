import { CalendarDays } from "lucide-react";

function DashboardHeader() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  const now = new Date();

  const weekday = now.toLocaleDateString("en-IN", {
    weekday: "long",
  });

  const day = now.toLocaleDateString("en-IN", {
    day: "numeric",
  });

  const month = now.toLocaleDateString("en-IN", {
    month: "long",
  });

  const year = now.toLocaleDateString("en-IN", {
    year: "numeric",
  });

  return (
    <div className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-6 transition-colors duration-300 md:flex-row md:items-center">
      <div>
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
          {weekday.toUpperCase()}
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
          {greeting}, Admin
        </h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back to the Inventory Management Dashboard.
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-3">
        <CalendarDays
          size={20}
          strokeWidth={1.75}
          className="text-amber-600 dark:text-amber-400"
        />

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold leading-none text-foreground">
            {day}
          </span>

          <span className="text-sm font-medium leading-none text-muted-foreground">
            {month} {year}
          </span>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;