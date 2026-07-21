import { CalendarDays, Clock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function DashboardHeader() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const name = user.name || "Admin";

  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const weekday = now.toLocaleDateString("en-IN", { weekday: "long" });
  const dateLabel = now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Percent of the day elapsed — drives the signature ring
  const dayProgress = useMemo(() => {
    const seconds =
      now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
    return seconds / 864; // 86400s = 100%
  }, [now]);

  const RADIUS = 26;
  const CIRC = 2 * Math.PI * RADIUS;
  const offset = CIRC - (dayProgress / 100) * CIRC;

  return (
    <div className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-card p-6 transition-colors duration-300 md:flex-row md:items-center">
      <div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
            {weekday.toUpperCase()} · {dateLabel.toUpperCase()}
          </p>
        </div>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          {greeting},{" "}
          <span className="text-amber-600 dark:text-amber-400">{name}</span>
        </h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back to the Inventory Management Dashboard.
        </p>
      </div>

      <div className="flex items-center gap-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-5 py-4">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          <svg viewBox="0 0 64 64" className="h-14 w-14 -rotate-90">
            <circle
              cx="32"
              cy="32"
              r={RADIUS}
              fill="none"
              strokeWidth="4"
              className="stroke-amber-500/20"
            />
            <circle
              cx="32"
              cy="32"
              r={RADIUS}
              fill="none"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={offset}
              className="stroke-amber-500 dark:stroke-amber-400 transition-[stroke-dashoffset] duration-1000 ease-linear"
            />
          </svg>
          <CalendarDays
            size={18}
            strokeWidth={1.75}
            className="absolute text-amber-600 dark:text-amber-400"
          />
        </div>

        <div className="border-l border-amber-500/20 pl-4">
          <p className="text-lg font-bold tabular-nums text-foreground">
            {time}
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            <Clock size={13} className="text-amber-600 dark:text-amber-400" />
            <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
              {Math.round(dayProgress)}% of day elapsed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;