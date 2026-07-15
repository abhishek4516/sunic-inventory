// InventoryTable.tsx — same structure, header/actions restyled to match the token system
import StatusBadge from "./StatusBadge";

export interface InventoryItem {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  availableQuantity: number;
}

interface InventoryTableProps {
  items: InventoryItem[];
  loading: boolean;
  onEdit: (item: InventoryItem) => void;
  onDelete: (item: InventoryItem) => void;
}

function InventoryTable({ items, loading, onEdit, onDelete }: InventoryTableProps) {
  const headers = ["Item", "Category", "Total", "Available", "Status", "Actions"];

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full">
        <thead className="bg-muted/50">
          <tr className="border-b border-border text-left">
            {headers.map((h) => (
              <th
                key={h}
                className={`px-4 py-3 font-mono text-[10px] font-semibold tracking-[0.1em] text-muted-foreground ${
                  h === "Actions" ? "text-center" : ""
                }`}
              >
                {h.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <tr key={i} className="border-b border-border last:border-none">
                {headers.map((h) => (
                  <td key={h} className="px-4 py-4">
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                  </td>
                ))}
              </tr>
            ))}

          {!loading && items.length === 0 && (
            <tr>
              <td colSpan={6} className="py-10 text-center text-muted-foreground">
                No inventory items found.
              </td>
            </tr>
          )}

          {!loading &&
            items.map((item) => (
              <tr
                key={item._id}
                className="border-b border-border transition-colors last:border-none hover:bg-accent"
              >
                <td className="px-4 py-4 font-medium text-foreground">{item.name}</td>
                <td className="px-4 py-4 text-foreground">{item.category}</td>
                <td className="px-4 py-4 text-foreground">{item.quantity}</td>
                <td className="px-4 py-4 text-foreground">{item.availableQuantity}</td>
                <td className="px-4 py-4">
                  <StatusBadge availableQuantity={item.availableQuantity} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="rounded-md bg-red-500 px-3 py-1 text-sm font-medium text-white transition hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;