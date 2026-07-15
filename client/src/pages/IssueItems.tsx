import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import AdminLayout from "../layouts/AdminLayout";
import DashboardHeader from "../components/DashboardHeader";
import { getItems } from "../services/inventoryService";
import {
  getIssuedItems,
  issueItem,
} from "../services/issueService";

interface Item {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  availableQuantity: number;
}

interface Issue {
  _id: string;
  employeeName: string;
  quantity: number;
  remarks: string;
  status: string;
  issuedAt: string;
  itemId: Item;
}

function IssueItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);

  const [employeeName, setEmployeeName] = useState("");
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [remarks, setRemarks] = useState("");

  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      const inventory = await getItems();
      const issued = await getIssuedItems();

      setItems(inventory);
      setIssues(issued);
    } catch {
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const selectedItem = useMemo(() => {
    return items.find((i) => i._id === itemId);
  }, [items, itemId]);

  const handleIssue = async () => {
    if (!employeeName.trim()) {
      toast.error("Enter employee name");
      return;
    }

    if (!itemId) {
      toast.error("Select an item");
      return;
    }

    if (quantity <= 0) {
      toast.error("Quantity must be greater than zero");
      return;
    }

    try {
      setLoading(true);

      await issueItem({
        employeeName,
        itemId,
        quantity,
        remarks,
      });

      toast.success("Item issued successfully");

      setEmployeeName("");
      setItemId("");
      setQuantity(1);
      setRemarks("");

      loadData();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to issue item"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <DashboardHeader />
                <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-6 text-xl font-bold text-foreground">
            Issue Item
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                EMPLOYEE NAME
              </label>

              <input
                value={employeeName}
                onChange={(e) =>
                  setEmployeeName(e.target.value)
                }
                placeholder="Enter employee name"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                INVENTORY ITEM
              </label>

              <select
                value={itemId}
                onChange={(e) =>
                  setItemId(e.target.value)
                }
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              >
                <option value="">
                  Select Inventory Item
                </option>

                {items.map((item) => (
                  <option
                    key={item._id}
                    value={item._id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                AVAILABLE STOCK
              </label>

              <input
                disabled
                value={
                  selectedItem
                    ? selectedItem.availableQuantity
                    : ""
                }
                className="w-full rounded-lg border border-border bg-accent px-4 py-2 text-foreground"
              />
            </div>

            <div>
              <label className="mb-2 block font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                QUANTITY
              </label>

              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.max(
                      1,
                      Number(e.target.value)
                    )
                  )
                }
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                REMARKS
              </label>

              <textarea
                rows={3}
                value={remarks}
                onChange={(e) =>
                  setRemarks(e.target.value)
                }
                placeholder="Optional remarks..."
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleIssue}
              disabled={loading}
              className="rounded-lg bg-primary px-6 py-2 text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {loading
                ? "Issuing..."
                : "Issue Item"}
            </button>
          </div>
        </div>
                <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">
              Issued Items
            </h2>

            <span className="rounded-lg border border-border bg-background px-3 py-1 font-mono text-xs text-muted-foreground">
              {issues.length} RECORDS
            </span>
          </div>

          {issues.length === 0 ? (
            <div className="flex h-56 items-center justify-center rounded-xl border border-dashed border-border">
              <p className="text-muted-foreground">
                No items have been issued yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="pb-3 text-left font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                      EMPLOYEE
                    </th>

                    <th className="pb-3 text-left font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                      ITEM
                    </th>

                    <th className="pb-3 text-left font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                      CATEGORY
                    </th>

                    <th className="pb-3 text-center font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                      QTY
                    </th>

                    <th className="pb-3 text-left font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                      STATUS
                    </th>

                    <th className="pb-3 text-left font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                      DATE
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {issues.map((issue) => (
                    <tr
                      key={issue._id}
                      className="border-b border-border transition-colors hover:bg-accent"
                    >
                      <td className="py-4 text-sm font-medium text-foreground">
                        {issue.employeeName}
                      </td>

                      <td className="py-4 text-sm text-foreground">
                        {issue.itemId?.name}
                      </td>

                      <td className="py-4 text-sm text-muted-foreground">
                        {issue.itemId?.category}
                      </td>

                      <td className="py-4 text-center">
                        <span className="rounded-md bg-primary/10 px-3 py-1 font-semibold text-primary">
                          {issue.quantity}
                        </span>
                      </td>

                      <td className="py-4">
                        <span className="rounded-md bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">
                          {issue.status}
                        </span>
                      </td>

                      <td className="py-4 text-sm text-muted-foreground">
                        {new Date(
                          issue.issuedAt
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default IssueItems;