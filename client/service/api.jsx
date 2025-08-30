import axios from "axios";

const API_URL_TODO = "https://todoapp-backend-yun2.onrender.com/api/todo";
const API_URL_AUTH = "https://todoapp-backend-yun2.onrender.com/api/auth";
const API_URL_USER = "https://todoapp-backend-yun2.onrender.com/api/user";

export const apiTodo = axios.create({
  baseURL: API_URL_TODO,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const apiAuth = axios.create({
  baseURL: API_URL_AUTH,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const apiUser = axios.create({
  baseURL: API_URL_USER,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
