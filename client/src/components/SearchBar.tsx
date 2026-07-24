
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full md:w-80">
      <Search
        size={16}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
       placeholder="Search employees..."
        className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-4 text-foreground placeholder:text-muted-foreground outline-none transition-colors duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}

export default SearchBar;