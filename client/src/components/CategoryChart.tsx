import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useTheme } from "../context/ThemeContext";
import { useDashboard } from "../context/DashboardContext";

const COLORS = [
  "#E5A44D",
  "#B87D2E",
  "#0D1420",
  "#8892A6",
  "#EDC183",
];

function CustomTooltip({
  active,
  payload,
  theme,
}: any) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className={`rounded-lg border px-3 py-2 shadow-sm ${
        theme === "dark"
          ? "border-slate-700 bg-slate-900"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="font-mono text-[10px] tracking-[0.1em] text-muted-foreground">
        {payload[0].name?.toUpperCase()}
      </p>

      <p className="mt-1 text-sm font-bold text-foreground">
        {payload[0].value} items
      </p>
    </div>
  );
}

function CategoryChart() {
  const { theme } = useTheme();
  const { dashboard, loading } = useDashboard();

  if (loading || !dashboard) {
    return (
      <div className="h-[420px] animate-pulse rounded-2xl border border-border bg-card" />
    );
  }

  const categoryData = dashboard.categories;

  const total = categoryData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-colors duration-300">
      <h2 className="mb-6 text-lg font-bold tracking-tight text-foreground">
        Category Distribution
      </h2>

      <div className="flex flex-col items-center gap-8 md:flex-row">
        <div className="relative h-[260px] w-full max-w-[260px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={78}
                outerRadius={110}
                paddingAngle={2}
                stroke="none"
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                content={<CustomTooltip theme={theme} />}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">
              {total}
            </span>

            <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
              TOTAL
            </span>
          </div>
        </div>

        <div className="w-full space-y-3">
          {categoryData.map((item, index) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor:
                      COLORS[index % COLORS.length],
                  }}
                />

                <span className="text-sm font-medium text-foreground">
                  {item.name}
                </span>
              </div>

              <span className="font-mono text-sm font-bold text-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryChart;