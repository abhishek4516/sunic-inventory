import { useState } from "react";
import { Plus } from "lucide-react";
import AdminLayout from "../layouts/AdminLayout";
import SearchBar from "../components/SearchBar";

function EmployeeDashboard() {
  const [search, setSearch] = useState("");

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Employees
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage employees and assign inventory.
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600">
            <Plus size={16} strokeWidth={2.5} />
            Add Employee
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-colors duration-300">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SearchBar
              value={search}
              onChange={setSearch}
            />
          </div>

          <div className="overflow-hidden rounded-xl border border-border">
            <table className="min-w-full">
              <thead className="bg-muted/50">
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                    EMPLOYEE ID
                  </th>

                  <th className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                    NAME
                  </th>

                  <th className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                    DEPARTMENT
                  </th>

                  <th className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                    DESIGNATION
                  </th>

                  <th className="px-4 py-3 text-left font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                    STATUS
                  </th>

                  <th className="px-4 py-3 text-center font-mono text-[10px] tracking-[0.12em] text-muted-foreground">
                    ACTIONS
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td
                    colSpan={6}
                    className="py-16 text-center text-muted-foreground"
                  >
                    No employees found.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default EmployeeDashboard;