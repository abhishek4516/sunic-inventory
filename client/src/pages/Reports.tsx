import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Printer,
  Download,
  FileSpreadsheet,
  Package,
  AlertTriangle,
  Boxes,
} from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AdminLayout from "../layouts/AdminLayout";
import Loader from "../components/Loader";
import StatusBadge from "../components/StatusBadge";
import { getItems } from "../services/inventoryService";

interface InventoryItem {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  availableQuantity: number;
  createdAt: string;
  updatedAt: string;
}

const Reports = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    return ["All", ...new Set(items.map((i) => i.category))];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const stockStatus =
        item.availableQuantity === 0
          ? "Out of Stock"
          : item.availableQuantity <= 5
          ? "Low Stock"
          : "In Stock";

      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = category === "All" || item.category === category;
      const matchesStatus = status === "All" || stockStatus === status;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, search, category, status]);

  const stats = useMemo(() => {
    return {
      totalItems: items.length,
      totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
      totalAvailable: items.reduce((sum, item) => sum + item.availableQuantity, 0),
      lowStock: items.filter((i) => i.availableQuantity > 0 && i.availableQuantity <= 5).length,
      outOfStock: items.filter((i) => i.availableQuantity === 0).length,
    };
  }, [items]);

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredItems.map((item) => ({
        Item: item.name,
        Category: item.category,
        Quantity: item.quantity,
        Available: item.availableQuantity,
        Status:
          item.availableQuantity === 0
            ? "Out of Stock"
            : item.availableQuantity <= 5
            ? "Low Stock"
            : "In Stock",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Report");
    XLSX.writeFile(workbook, "Inventory_Report.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("SUNIC TECHNOLOGIES", 14, 18);

    doc.setFontSize(11);
    doc.text(`Generated : ${new Date().toLocaleString()}`, 14, 28);

    autoTable(doc, {
      startY: 38,
      head: [["Item", "Category", "Quantity", "Available", "Status"]],
      body: filteredItems.map((item) => [
        item.name,
        item.category,
        item.quantity,
        item.availableQuantity,
        item.availableQuantity === 0
          ? "Out of Stock"
          : item.availableQuantity <= 5
          ? "Low Stock"
          : "In Stock",
      ]),
    });

    doc.save("Inventory_Report.pdf");
  };

  const printReport = () => {
    window.print();
  };

  const statCards = [
    {
      label: "Total Items",
      value: stats.totalItems,
      icon: Package,
      color: "text-amber-500",
    },
    {
      label: "Total Quantity",
      value: stats.totalQuantity,
      icon: Boxes,
      color: "text-green-500",
    },
    {
      label: "Available",
      value: stats.totalAvailable,
      icon: Package,
      color: "text-blue-500",
    },
    {
      label: "Low Stock",
      value: stats.lowStock,
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
    {
      label: "Out Of Stock",
      value: stats.outOfStock,
      icon: AlertTriangle,
      color: "text-red-500",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Inventory Reports
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              View, analyse and export complete inventory reports.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={printReport}
              className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent"
            >
              <Printer size={16} strokeWidth={2} />
              Print
            </button>

            <button
              onClick={exportPDF}
              className="flex items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent"
            >
              <Download size={16} strokeWidth={2} />
              PDF
            </button>

            <button
              onClick={exportExcel}
              className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              <FileSpreadsheet size={16} strokeWidth={2} />
              Excel
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{card.label}</p>
                    <h2 className={`mt-2 text-3xl font-bold ${card.color}`}>
                      {card.value}
                    </h2>
                  </div>
                  <Icon className={card.color} size={32} strokeWidth={1.75} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors duration-300">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="text"
                placeholder="Search item..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
            >
              <option>All</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-border bg-card shadow-sm transition-colors duration-300 overflow-hidden">
          {loading ? (
            <div className="flex h-72 items-center justify-center">
              <Loader />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="flex h-72 flex-col items-center justify-center">
              <Package size={56} className="mb-4 text-muted-foreground" />
              <h2 className="text-lg font-semibold text-foreground">No Records Found</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Item</th>
                    <th className="px-6 py-4 text-left font-semibold text-foreground">Category</th>
                    <th className="px-6 py-4 text-center font-semibold text-foreground">Quantity</th>
                    <th className="px-6 py-4 text-center font-semibold text-foreground">Available</th>
                    <th className="px-6 py-4 text-center font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-center font-semibold text-foreground">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => (
                    <tr
                      key={item._id}
                      className="border-t border-border transition hover:bg-accent/50"
                    >
                      <td className="px-6 py-4 font-medium text-foreground">{item.name}</td>
                      <td className="px-6 py-4 text-muted-foreground">{item.category}</td>
                      <td className="px-6 py-4 text-center text-foreground">{item.quantity}</td>
                      <td className="px-6 py-4 text-center text-foreground">
                        {item.availableQuantity}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <StatusBadge availableQuantity={item.availableQuantity} />
                      </td>
                      <td className="px-6 py-4 text-center text-muted-foreground">
                        {new Date(item.updatedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <div>
            Showing
            <span className="mx-1 font-semibold text-foreground">{filteredItems.length}</span>
            of
            <span className="mx-1 font-semibold text-foreground">{items.length}</span>
            inventory items.
          </div>

          <div>
            Generated on {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Print-only view */}
        <div className="hidden print:block bg-white p-8 text-black">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">SUNIC TECHNOLOGIES</h1>
            <h2 className="mt-2 text-xl font-semibold">Inventory Report</h2>
            <p className="mt-2 text-sm">Generated on {new Date().toLocaleString()}</p>
          </div>

          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black p-2 text-left">ITEM</th>
                <th className="border border-black p-2 text-left">CATEGORY</th>
                <th className="border border-black p-2 text-center">QUANTITY</th>
                <th className="border border-black p-2 text-center">AVAILABLE</th>
                <th className="border border-black p-2 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id}>
                  <td className="border border-black p-2">{item.name}</td>
                  <td className="border border-black p-2">{item.category}</td>
                  <td className="border border-black p-2 text-center">{item.quantity}</td>
                  <td className="border border-black p-2 text-center">
                    {item.availableQuantity}
                  </td>
                  <td className="border border-black p-2 text-center">
                    {item.availableQuantity === 0
                      ? "Out of Stock"
                      : item.availableQuantity <= 5
                      ? "Low Stock"
                      : "In Stock"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-10 flex items-end justify-between">
            <p className="text-sm">
              Total Items: <strong>{filteredItems.length}</strong>
            </p>
            <div className="text-center">
              <div className="mb-12 w-48 border-b border-black"></div>
              <p className="text-sm font-semibold">Authorized Signature</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reports;