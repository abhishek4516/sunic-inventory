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
    return [
      "All",
      ...new Set(items.map((i) => i.category)),
    ];
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

      const matchesCategory =
        category === "All" ||
        item.category === category;

      const matchesStatus =
        status === "All" ||
        stockStatus === status;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [items, search, category, status]);

  const stats = useMemo(() => {
    return {
      totalItems: items.length,

      totalQuantity: items.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),

      totalAvailable: items.reduce(
        (sum, item) => sum + item.availableQuantity,
        0
      ),

      lowStock: items.filter(
        (i) =>
          i.availableQuantity > 0 &&
          i.availableQuantity <= 5
      ).length,

      outOfStock: items.filter(
        (i) => i.availableQuantity === 0
      ).length,
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

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Inventory Report"
    );

    XLSX.writeFile(
      workbook,
      "Inventory_Report.xlsx"
    );
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(
      "SUNIC TECHNOLOGIES",
      14,
      18
    );

    doc.setFontSize(11);

    doc.text(
      `Generated : ${new Date().toLocaleString()}`,
      14,
      28
    );

    autoTable(doc, {
      startY: 38,

      head: [[
        "Item",
        "Category",
        "Quantity",
        "Available",
        "Status",
      ]],

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
    return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <h1 className="text-3xl font-bold">
            Inventory Reports
          </h1>

          <p className="text-muted-foreground mt-1">
            View, analyse and export complete inventory reports.
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={printReport}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-muted transition"
          >
            <Printer size={18} />
            Print
          </button>

          <button
            onClick={exportPDF}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-muted transition"
          >
            <Download size={18} />
            PDF
          </button>

          <button
            onClick={exportExcel}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-muted transition"
          >
            <FileSpreadsheet size={18} />
            Excel
          </button>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

        <div className="rounded-xl border bg-card p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Total Items
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.totalItems}
              </h2>

            </div>

            <Package className="text-primary" size={34} />

          </div>

        </div>

        <div className="rounded-xl border bg-card p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Total Quantity
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.totalQuantity}
              </h2>

            </div>

            <Boxes className="text-green-600" size={34} />

          </div>

        </div>

        <div className="rounded-xl border bg-card p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Available
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.totalAvailable}
              </h2>

            </div>

            <Package className="text-blue-600" size={34} />

          </div>

        </div>

        <div className="rounded-xl border bg-card p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Low Stock
              </p>

              <h2 className="text-3xl font-bold text-yellow-500 mt-2">
                {stats.lowStock}
              </h2>

            </div>

            <AlertTriangle
              size={34}
              className="text-yellow-500"
            />

          </div>

        </div>

        <div className="rounded-xl border bg-card p-5">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-muted-foreground">
                Out Of Stock
              </p>

              <h2 className="text-3xl font-bold text-red-500 mt-2">
                {stats.outOfStock}
              </h2>

            </div>

            <AlertTriangle
              size={34}
              className="text-red-500"
            />

          </div>

        </div>

      </div>

      {/* Filters */}

      <div className="rounded-xl border bg-card p-5">

        <div className="grid md:grid-cols-3 gap-4">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search item..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border pl-10 pr-4 py-2 outline-none"
            />

          </div>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="rounded-lg border px-3 py-2"
          >

            {categories.map((cat) => (

              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>

            ))}

          </select>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="rounded-lg border px-3 py-2"
          >

            <option>All</option>

            <option>In Stock</option>

            <option>Low Stock</option>

            <option>Out of Stock</option>

          </select>

        </div>

      </div>
            {/* Table */}

      <div className="rounded-xl border bg-card overflow-hidden">

        {loading ? (

          <div className="flex justify-center items-center h-72">

            <Loader />

          </div>

        ) : filteredItems.length === 0 ? (

          <div className="flex flex-col items-center justify-center h-72">

            <Package
              size={60}
              className="text-muted-foreground mb-4"
            />

            <h2 className="text-xl font-semibold">
              No Records Found
            </h2>

            <p className="text-muted-foreground mt-2">
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-muted">

                <tr>

                  <th className="text-left px-6 py-4">
                    Item
                  </th>

                  <th className="text-left px-6 py-4">
                    Category
                  </th>

                  <th className="text-center px-6 py-4">
                    Quantity
                  </th>

                  <th className="text-center px-6 py-4">
                    Available
                  </th>

                  <th className="text-center px-6 py-4">
                    Status
                  </th>

                  <th className="text-center px-6 py-4">
                    Updated
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredItems.map((item) => {

                  const status =
                    item.availableQuantity === 0
                      ? "Out of Stock"
                      : item.availableQuantity <= 5
                      ? "Low Stock"
                      : "In Stock";

                  return (

                    <tr
                      key={item._id}
                      className="border-t hover:bg-muted/40 transition"
                    >

                      <td className="px-6 py-4 font-medium">

                        {item.name}

                      </td>

                      <td className="px-6 py-4">

                        {item.category}

                      </td>

                      <td className="px-6 py-4 text-center">

                        {item.quantity}

                      </td>

                      <td className="px-6 py-4 text-center">

                        {item.availableQuantity}

                      </td>

                      <td className="px-6 py-4 text-center">

                        <StatusBadge
                          status={status}
                        />

                      </td>

                      <td className="px-6 py-4 text-center">

                        {new Date(
                          item.updatedAt
                        ).toLocaleDateString()}

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        )}

      </div>
            {/* Footer */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">

        <div>
          Showing
          <span className="font-semibold mx-1">
            {filteredItems.length}
          </span>
          of
          <span className="font-semibold mx-1">
            {items.length}
          </span>
          inventory items.
        </div>

        <div>
          Generated on{" "}
          {new Date().toLocaleDateString()}{" "}
          {new Date().toLocaleTimeString()}
        </div>

      </div>

    </div>
  );
};

export default Reports;