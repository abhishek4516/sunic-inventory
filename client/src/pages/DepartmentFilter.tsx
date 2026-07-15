import { ChevronDown } from "lucide-react";

interface DepartmentFilterProps {
  value: string;
  onChange: (value: string) => void;
}

function DepartmentFilter({
  value,
  onChange,
}: DepartmentFilterProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-border bg-background px-4 py-2 pr-10 text-foreground outline-none transition-colors duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20 md:w-56"
      >
        <option value="">All Departments</option>
        <option value="IT">IT</option>
        <option value="Operations">Operations</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
        <option value="Administration">Administration</option>
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}

export default DepartmentFilter;