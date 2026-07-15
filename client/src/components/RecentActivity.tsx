import { recentActivities } from "../data/dashboard";

function RecentActivity() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-colors duration-300">
      <h2 className="mb-6 text-lg font-bold tracking-tight text-foreground">
        Recent Activity
      </h2>

      <div className="relative">
        {recentActivities.map((activity, index) => (
          <div
            key={activity.id}
            className="relative flex gap-4 pb-6 last:pb-0"
          >
            {index !== recentActivities.length - 1 && (
              <span className="absolute left-[5px] top-3 h-full w-px bg-border" />
            )}

            <span
              className={`relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 ${
                index === 0
                  ? "border-amber-500 bg-amber-500/20"
                  : "border-border bg-card"
              }`}
            />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium leading-snug text-foreground">
                {activity.text}
              </p>

              <p className="mt-1 font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
                {activity.time.toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;