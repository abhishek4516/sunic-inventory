import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/api`;

export interface IssuePayload {
  itemId: string;
  employeeName: string;
  quantity: number;
  remarks?: string;
  issuedBy?: string;
}
export const issueItem = async (data: IssuePayload) => {
  const res = await axios.post(`${API}/issues`, data);
  return res.data;
};

export const getIssuedItems = async () => {
  const res = await axios.get(`${API}/issues`);
  return res.data.issues;
};