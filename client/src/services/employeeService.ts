import api from "./api";

export interface Employee {
  _id?: string;
  employeeId: string;
  name: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

export const getEmployees = async () => {
  const res = await api.get("/employees");
  return res.data.employees;
};

export const addEmployee = async (employee: Employee) => {
  const res = await api.post("/employees", employee);
  return res.data;
};

export const updateEmployee = async (
  id: string,
  employee: Employee
) => {
  const res = await api.put(`/employees/${id}`, employee);
  return res.data;
};

export const deleteEmployee = async (id: string) => {
  const res = await api.delete(`/employees/${id}`);
  return res.data;
};