import { useEffect, useState } from "react";
import Drawer from "../components/Drawer";
import type { Employee } from "../services/employeeService";

interface EmployeeDrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => void;
  employee?: Employee | null;
}

const emptyEmployee: Employee = {
  _id: "",
  employeeId: "",
  name: "",
  department: "",
  designation: "",
  status: "Active",
};

function EmployeeDrawer({
  open,
  onClose,
  onSave,
  employee,
}: EmployeeDrawerProps) {
  const [form, setForm] = useState<Employee>(emptyEmployee);

  useEffect(() => {
    if (employee) {
      setForm(employee);
    } else {
      setForm(emptyEmployee);
    }
  }, [employee, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (
      !form.employeeId.trim() ||
      !form.name.trim() ||
      !form.department.trim() ||
      !form.designation.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    onSave(form);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={
        employee ? "Edit Employee" : "Add Employee"
      }
    >
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Employee ID
          </label>

          <input
            name="employeeId"
            value={form.employeeId}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Employee Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Department
          </label>

          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Designation
          </label>

          <input
            name="designation"
            value={form.designation}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 outline-none"
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-lg bg-amber-500 px-5 py-2 font-medium text-white hover:bg-amber-600"
          >
            {employee ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </Drawer>
  );
}

export default EmployeeDrawer;