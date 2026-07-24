import axios from "axios";

const API = "https://sunic-inventory.onrender.com/api/auth";

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    _id: string;
    username: string;
    name: string;
  };
}

export const loginUser = async (
  data: LoginData
): Promise<LoginResponse> => {
  const res = await axios.post(`${API}/login`, data);
  return res.data;
};