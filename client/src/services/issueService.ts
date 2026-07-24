import api from "./api";

export interface IssuePayload {
  itemId: string;
  employeeName: string;
  quantity: number;
  remarks?: string;
  issuedBy?: string;
}

export const issueItem = async (data: IssuePayload) => {
  const res = await api.post("/issues", data);
  return res.data;
};

export const getIssuedItems = async () => {
  const res = await api.get("/issues");
  return res.data.issues ?? [];
};