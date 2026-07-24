import EmployeeStatusBadge from "./EmployeeStatusBadge";
import type { Employee } from "../services/employeeService";

interface EmployeeTableProps {
  employees: Employee[];
  loading: boolean;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

function EmployeeTable({
  employees,
  loading,
  onEdit,
  onDelete,
}: EmployeeTableProps) {
  const headers = [
    "Employee ID",
    "Name",
    "Department",
    "Designation",
    "Status",
    "Actions",
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full">
        <thead className="bg-muted/50">
          <tr className="border-b border-border">
            {headers.map((header) => (
              <th
                key={header}
                className={`px-4 py-3 text-left font-mono text-[10px] font-semibold tracking-[0.12em] text-muted-foreground ${
                  header === "Actions" ? "text-center" : ""
                }`}
              >
                {header.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading &&
            Array.from({ length: 5 }).map((_, index) => (
              <tr
                key={index}
                className="border-b border-border last:border-none"
              >
                {headers.map((header) => (
                  <td
                    key={header}
                    className="px-4 py-4"
                  >
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                  </td>
                ))}
              </tr>
            ))}

          {!loading && employees.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="py-16 text-center text-muted-foreground"
              >
                No employees found.
              </td>
            </tr>
          )}

          {!loading &&
            employees.map((employee) => (
              <tr
                key={employee._id}
                className="border-b border-border transition-colors hover:bg-accent last:border-none"
              >
                <td className="px-4 py-4 font-mono text-sm font-semibold text-foreground">
                  {employee.employeeId}
                </td>

                <td className="px-4 py-4 font-medium text-foreground">
                  {employee.name}
                </td>

                <td className="px-4 py-4 text-foreground">
                  {employee.department}
                </td>

                <td className="px-4 py-4 text-foreground">
                  {employee.designation}
                </td>

             

                <td className="px-4 py-4">
                  <EmployeeStatusBadge
                    status={employee.status}
                  />
                </td>

                <td className="px-4 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(employee)}
                      className="rounded-md bg-amber-500 px-3 py-1 text-sm font-medium text-white transition hover:bg-amber-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(employee)}
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

export default EmployeeTable;