import axios from "axios";

const API = "http://localhost:5000/api";

export interface IssuePayload {
  itemId: string;
  employeeId: string;
  quantity: number;
  remarks?: string;
}

export const issueItem = async (data: IssuePayload) => {
  const res = await axios.post(`${API}/issues`, data);
  return res.data;
};

export const getIssuedItems = async () => {
  const res = await axios.get(`${API}/issues`);
  return res.data.issues;
};