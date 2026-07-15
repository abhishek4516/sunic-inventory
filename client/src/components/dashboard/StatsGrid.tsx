import {
  Boxes,
  Package,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

import StatCard from "../StatCard";
import { useDashboard } from "../../context/DashboardContext";

function StatsGrid() {
  const { dashboard, loading } = useDashboard();

  if (loading || !dashboard) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-xl border border-border bg-card"
          />
        ))}
      </div>
    );
  }

  const dashboardStats = [
    {
      title: "Inventory Items",
      value: dashboard.stats.totalItems,
      icon: Boxes,
    },
    {
      title: "Total Quantity",
      value: dashboard.stats.totalQuantity,
      icon: Package,
    },
    {
      title: "Available Stock",
      value: dashboard.stats.availableQuantity,
      icon: CheckCircle2,
    },
    {
      title: "Low Stock",
      value: dashboard.stats.lowStock,
      icon: AlertTriangle,
    },
    {
      title: "Out of Stock",
      value: dashboard.stats.outOfStock,
      icon: XCircle,
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {dashboardStats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}

export default StatsGrid;