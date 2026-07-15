// CategoryFilter.tsx
import { ChevronDown } from "lucide-react";

interface CategoryFilterProps {
  value: string;
  onChange: (value: string) => void;
}

// Kept in sync with the category list in ItemDrawer
const CATEGORIES = ["Hardware", "Networking", "CCTV", "Electrical", "Consumables"];

function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="relative w-full sm:w-48">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-border bg-background py-2 pl-4 pr-9 text-foreground outline-none transition-colors duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}

export default CategoryFilter;