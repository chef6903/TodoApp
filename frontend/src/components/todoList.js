import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  fetchListTodos,
  addNewTodo,
} from "../redux/todos/todoSlide";
import TodoInput from "./todoInput";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import TodoItem from "./todoItem";

const TodoApp = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.listTodos);
  const [newTodo, setNewTodo] = useState("");
  const [title, setTitle] = useState("");

  return (
    <div style={styles.container}>
      <h2>📝 Todo App (Redux Toolkit)</h2>

      <TodoInput title={title} setTitle={setTitle} />
      <TodoItem />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 500,
    margin: "40px auto",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  inputContainer: {
    display: "flex",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    border: "1px solid #ccc",
    borderRadius: 4,
  },
  addButton: {
    marginLeft: 8,
    padding: "10px 16px",
    fontSize: 16,
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  todoItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: 10,
    padding: "8px 12px",
    backgroundColor: "#f9f9f9",
    borderRadius: 4,
  },
  deleteButton: {
    marginLeft: 8,
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "6px 10px",
    cursor: "pointer",
  },
};

export default TodoApp;
