import axios from "axios";

const API = "http://localhost:5000/api/employees";

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
  const res = await axios.get(API);
  return res.data.employees;
};

export const addEmployee = async (employee: Employee) => {
  const res = await axios.post(API, employee);
  return res.data;
};

export const updateEmployee = async (
  id: string,
  employee: Employee
) => {
  const res = await axios.put(`${API}/${id}`, employee);
  return res.data;
};

export const deleteEmployee = async (id: string) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};