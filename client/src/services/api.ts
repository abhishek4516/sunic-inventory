import axios from "axios";

const api = axios.create({
  baseURL: "https://sunic-inventory.onrender.com/api",
});

export default api;