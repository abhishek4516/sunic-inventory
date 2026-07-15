import { AlertTriangle } from "lucide-react";
import { lowStockItems } from "../data/dashboard";

function LowStockTable() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 transition-colors duration-300">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight text-foreground">
          Low Stock Items
        </h2>

        <div className="flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1">
          <AlertTriangle
            size={12}
            strokeWidth={2}
            className="text-red-500"
          />

          <span className="font-mono text-[10px] font-semibold tracking-[0.08em] text-red-500">
            {lowStockItems.length} ITEMS
          </span>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="pb-3 font-mono text-[10px] font-medium tracking-[0.1em] text-muted-foreground">
              ITEM
            </th>

            <th className="pb-3 text-right font-mono text-[10px] font-medium tracking-[0.1em] text-muted-foreground">
              REMAINING
            </th>
          </tr>
        </thead>

        <tbody>
          {lowStockItems.map((item) => (
            <tr
              key={item.id}
              className="border-b border-border transition-colors last:border-none hover:bg-accent"
            >
              <td className="py-3.5 text-sm font-medium text-foreground">
                {item.name}
              </td>

              <td className="py-3.5 text-right">
                <span className="inline-flex min-w-[2.5rem] justify-center rounded-md border border-red-500/20 bg-red-500/10 px-2 py-1 font-mono text-xs font-bold text-red-500">
                  {item.quantity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LowStockTable;