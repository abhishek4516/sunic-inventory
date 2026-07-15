import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { inventoryChartData } from "../data/dashboard";
import { useTheme } from "../context/ThemeContext";

function CustomTooltip({
  active,
  payload,
  label,
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
        {label?.toUpperCase()}
      </p>

      <p className="mt-0.5 text-sm font-bold text-foreground">
        {payload[0].value} items
      </p>
    </div>
  );
}

function InventoryChart() {
  const { theme } = useTheme();

  const gridColor =
    theme === "dark"
      ? "#334155"
      : "#EEF1F6";

  const axisColor =
    theme === "dark"
      ? "#94A3B8"
      : "#64748B";

  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-colors duration-300">
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="text-lg font-bold tracking-tight text-foreground">
          Inventory Overview
        </h2>

        <p className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
          BY CATEGORY
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <BarChart
          data={inventoryChartData}
          barCategoryGap="30%"
        >
          <CartesianGrid
            vertical={false}
            stroke={gridColor}
          />

          <XAxis
            dataKey="category"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: axisColor,
              fontSize: 12,
            }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            width={32}
            tick={{
              fill: axisColor,
              fontSize: 12,
            }}
          />

          <Tooltip
            cursor={{
              fill: "#E5A44D",
              fillOpacity: 0.08,
            }}
            content={
              <CustomTooltip theme={theme} />
            }
          />

          <Bar
            dataKey="items"
            fill="#E5A44D"
            radius={[6, 6, 0, 0]}
            maxBarSize={44}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default InventoryChart;