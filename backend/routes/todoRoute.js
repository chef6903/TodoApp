import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";
import userAuth from "../middleware/userAuth.js";

const todoRouter = express.Router();

// Tất cả route đều cần đăng nhập
todoRouter.get("/", userAuth, getTodos);
todoRouter.post("/create", userAuth, createTodo);
todoRouter.put("/update/:id", userAuth, updateTodo);
todoRouter.delete("/delete/:id", userAuth, deleteTodo);

export default todoRouter;
