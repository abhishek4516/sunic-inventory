import axios from "axios";

const API = "http://localhost:5000/api/auth";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (
  data: RegisterData
) => {
  const res = await axios.post(
    `${API}/register`,
    data
  );

  return res.data;
};

export const loginUser = async (
  data: LoginData
) => {
  const res = await axios.post(
    `${API}/login`,
    data
  );

  return res.data;
};