import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import AdminLayout from "../layouts/AdminLayout";
import SearchBar from "../components/SearchBar";
import DeleteDialog from "../components/DeleteDialog";

import EmployeeTable from "./EmployeeTable";
import EmployeeDrawer from "./EmployeeDrawer";

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";

import type { Employee } from "../services/employeeService";

function EmployeeDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const filteredEmployees = useMemo(() => {
    const keyword = search.toLowerCase();

    return employees.filter(
      (employee) =>
        employee.employeeId
          .toLowerCase()
          .includes(keyword) ||
        employee.name
          .toLowerCase()
          .includes(keyword) ||
        employee.department
          .toLowerCase()
          .includes(keyword) ||
        employee.designation
          .toLowerCase()
          .includes(keyword)
    );
  }, [employees, search]);

  const handleAdd = () => {
    setSelectedEmployee(null);
    setDrawerOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDrawerOpen(true);
  };

  const handleDelete = (employee: Employee) => {
    setSelectedEmployee(employee);
    setDeleteOpen(true);
  };

  const handleSave = async (employee: Employee) => {
    try {
      if (employee._id) {
        await updateEmployee(employee._id!, employee);
      } else {
        await addEmployee(employee);
      }

      setDrawerOpen(false);
      setSelectedEmployee(null);

      await loadEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    if (!selectedEmployee?._id) return;

    try {
      await deleteEmployee(selectedEmployee._id);

      setDeleteOpen(false);
      setSelectedEmployee(null);

      await loadEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Employees
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage employees and assign inventory.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
          >
            <Plus size={16} />
            Add Employee
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-5">
            <SearchBar
              value={search}
              onChange={setSearch}
            />
          </div>

          <EmployeeTable
            employees={filteredEmployees}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

        <EmployeeDrawer
          open={drawerOpen}
          employee={selectedEmployee}
          onClose={() => {
            setDrawerOpen(false);
            setSelectedEmployee(null);
          }}
          onSave={handleSave}
        />

        <DeleteDialog
          open={deleteOpen}
          title={selectedEmployee?.name ?? ""}
          onClose={() => {
            setDeleteOpen(false);
            setSelectedEmployee(null);
          }}
          onDelete={confirmDelete}
        />
      </div>
    </AdminLayout>
  );
}

export default EmployeeDashboard;