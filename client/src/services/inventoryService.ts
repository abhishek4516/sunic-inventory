import api from "./api";

export const getItems = async () => {
  const response = await api.get("/inventory");
  return response.data.items;
};

export const addItem = async (data: {
  name: string;
  category: string;
  quantity: number;
}) => {
  const response = await api.post("/inventory", data);
  return response.data;
};

export const updateItem = async (
  id: string,
  data: {
    name: string;
    category: string;
    quantity: number;
  }
) => {
  const response = await api.put(`/inventory/${id}`, data);
  return response.data;
};

export const deleteItem = async (id: string) => {
  const response = await api.delete(`/inventory/${id}`);
  return response.data;
};