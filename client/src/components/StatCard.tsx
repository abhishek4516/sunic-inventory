interface StatCardProps {
  title: string;
  value: number;
  icon: string;
}

function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-amber-500/40 hover:shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/10 text-xl">
          {icon}
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          {value}
        </h2>
      </div>

      <p className="mt-5 font-mono text-[11px] tracking-[0.12em] text-muted-foreground">
        {title.toUpperCase()}
      </p>
    </div>
  );
}

export default StatCard;