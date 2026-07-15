import {
  Boxes,
  ArrowUpFromLine,
  Users,
  ChartColumn,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Add Item",
      icon: Boxes,
      path: "/inventory",
    },
    {
      title: "Issue Item",
      icon: ArrowUpFromLine,
      path: "/issue-items",
    },
    {
      title: "Employees",
      icon: Users,
      path: "/employees",
    },
    {
      title: "Reports",
      icon: ChartColumn,
      path: "/reports",
    },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-colors duration-300">
      <h2 className="mb-4 text-lg font-bold tracking-tight text-foreground">
        Quick Actions
      </h2>

      <div className="space-y-1.5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="group flex w-full items-center gap-3 rounded-xl border border-transparent p-3 text-left transition-all duration-200 hover:border-amber-500/30 hover:bg-amber-500/10"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Icon
                  size={18}
                  strokeWidth={1.75}
                />
              </div>

              <span className="flex-1 text-sm font-semibold text-foreground">
                {action.title}
              </span>

              <ChevronRight
                size={16}
                className="text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-amber-500"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuickActions;