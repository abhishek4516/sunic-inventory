import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";
import Drawer from "./Drawer";
import { addItem, updateItem } from "../services/inventoryService";

interface Item {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  availableQuantity: number;
}

interface ItemDrawerProps {
  open: boolean;
  mode: "add" | "edit";
  item: Item | null;
  onClose: () => void;
  onSuccess: () => void;
}

function ItemDrawer({ open, mode, item, onClose, onSuccess }: ItemDrawerProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && item) {
      setName(item.name);
      setCategory(item.category);
      setQuantity(item.quantity);
    }

    if (mode === "add") {
      setName("");
      setCategory("");
      setQuantity(0);
    }
  }, [mode, item, open]);

  const handleSubmit = async () => {
    if (!name || !category || quantity <= 0) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      if (mode === "add") {
        await addItem({ name, category, quantity });
        toast.success("Item added successfully");
      } else if (item) {
        await updateItem(item._id, { name, category, quantity });
        toast.success("Item updated successfully");
      }

      onClose();
      onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      open={open}
      title={mode === "add" ? "Add Inventory Item" : "Edit Inventory Item"}
      onClose={onClose}
    >
      <div className="space-y-5">
        <div>
          <label className="mb-2 block font-mono text-[10px] font-semibold tracking-[0.1em] text-muted-foreground">
            ITEM NAME
          </label>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="mb-2 block font-mono text-[10px] font-semibold tracking-[0.1em] text-muted-foreground">
            CATEGORY
          </label>

          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none rounded-lg border border-border bg-background px-4 py-2 pr-9 text-foreground outline-none transition-colors duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select Category</option>
              <option>Hardware</option>
              <option>Networking</option>
              <option>CCTV</option>
              <option>Electrical</option>
              <option>Consumables</option>
            </select>

            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-mono text-[10px] font-semibold tracking-[0.1em] text-muted-foreground">
            QUANTITY
          </label>

          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground outline-none transition-colors duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex justify-end gap-3 pt-5">
          <button
            onClick={onClose}
            className="rounded-lg border border-border bg-background px-5 py-2 text-foreground transition-colors duration-300 hover:bg-accent"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="rounded-lg bg-primary px-5 py-2 text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? mode === "add"
                ? "Saving..."
                : "Updating..."
              : mode === "add"
              ? "Save"
              : "Update"}
          </button>
        </div>
      </div>
    </Drawer>
  );
}

export default ItemDrawer;