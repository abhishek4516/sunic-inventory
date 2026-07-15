import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import InventoryTable from "../components/InventoryTable";
import type { InventoryItem } from "../components/InventoryTable";
import ItemDrawer from "../components/ItemDrawer";
import DeleteDialog from "../components/DeleteDialog";
import { deleteItem, getItems } from "../services/inventoryService";

function Inventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"add" | "edit">("add");

  const [selectedItem, setSelectedItem] =
    useState<InventoryItem | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
    } catch {
      toast.error("Unable to load inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [items, search, category]);

  const openAddDrawer = () => {
    setDrawerMode("add");
    setSelectedItem(null);
    setDrawerOpen(true);
  };

  const openEditDrawer = (item: InventoryItem) => {
    setDrawerMode("edit");
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const openDeleteDialog = (item: InventoryItem) => {
    setSelectedItem(item);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      await deleteItem(selectedItem._id);

      toast.success("Item deleted successfully");

      setDeleteOpen(false);
      setSelectedItem(null);

      fetchItems();
    } catch {
      toast.error("Unable to delete item");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Inventory
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage all inventory items.
            </p>
          </div>

          <button
            onClick={openAddDrawer}
            className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            <Plus
              size={16}
              strokeWidth={2.5}
            />
            Add Item
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors duration-300">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SearchBar
              value={search}
              onChange={setSearch}
            />

            <CategoryFilter
              value={category}
              onChange={setCategory}
            />
          </div>

          <InventoryTable
            items={filteredItems}
            loading={loading}
            onEdit={openEditDrawer}
            onDelete={openDeleteDialog}
          />
        </div>

        <ItemDrawer
          open={drawerOpen}
          mode={drawerMode}
          item={selectedItem}
          onClose={() => setDrawerOpen(false)}
          onSuccess={fetchItems}
        />

        <DeleteDialog
          open={deleteOpen}
          title={selectedItem?.name || ""}
          onClose={() => {
            setDeleteOpen(false);
            setSelectedItem(null);
          }}
          onDelete={handleDelete}
        />
      </div>
    </AdminLayout>
  );
}

export default Inventory;