import axios from "axios";

const API_URL_TODO = "http://localhost:4000/api/todo";
const API_URL_AUTH = "http://localhost:4000/api/auth";
const API_URL_USER = "http://localhost:4000/api/user";

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
