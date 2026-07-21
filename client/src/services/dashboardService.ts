import api from "./api";

export interface DashboardData {
  stats: {
    totalItems: number;
    totalQuantity: number;
    availableQuantity: number;
    lowStock: number;
    outOfStock: number;
  };

  categories: {
    name: string;
    value: number;
  }[];

  lowStockItems: {
    _id: string;
    name: string;
    quantity: number;
    availableQuantity: number;
    category: string;
  }[];

  recentItems: {
    _id: string;
    name: string;
    quantity: number;
    availableQuantity: number;
    category: string;
    createdAt: string;
  }[];

  recentActivity: {
    id: string;
    text: string;
    time: string;
  }[];
}

export const getDashboard = async (): Promise<DashboardData> => {
  const { data } = await api.get("/dashboard");
  return data;
};