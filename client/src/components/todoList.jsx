import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchListTodos,
  deleteTodo,
  addNewTodo,
} from "../redux/todos/todoSlide.jsx";
import TodoInput from "./todoInput.jsx";
import { useAppDispatch, useAppSelector } from "../redux/hook.jsx";
import TodoItem from "./todoItem.jsx";

const TodoApp = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.listTodos);
  const [newTodo, setNewTodo] = useState("");
  const [title, setTitle] = useState("");
  const [activeTab, setActiveTab] = useState("today");

  // const filteredTodos = todos.filter((todo) => {
  //   if (activeTab === "today") {
  //     return !todo.completed; // ví dụ: show todos chưa hoàn thành trong Today
  //   }
  //   if (activeTab === "pending") {
  //     return !todo.completed; // pending = chưa xong
  //   }
  //   if (activeTab === "completed") {
  //     return todo.completed; // giả sử overdue = đã hoàn thành
  //   }
  //   return true;
  // });

  return (
    <div className="max-w-lg my-10 mx-auto rounded-lg bg-[#fff] shadow">
      <h2 className="mb-4 text-center bg-[#2F6A34] text-white text-2xl py-3">
        📝 My Tasks
      </h2>
      <nav class="flex justify-center space-x-2 my-4">
        <button
          onClick={() => setActiveTab("today")}
          className={`px-6 py-2 rounded-md font-medium ${
            activeTab === "today"
              ? "bg-green-900 text-white"
              : "bg-green-200 text-black"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-6 py-2 rounded-md font-medium ${
            activeTab === "pending"
              ? "bg-green-900 text-white"
              : "bg-green-200 text-black"
          }`}
        >
          Pending
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`px-6 py-2 rounded-md font-medium ${
            activeTab === "completed"
              ? "bg-green-900 text-white"
              : "bg-green-200 text-black"
          }`}
        >
          Completed
        </button>
      </nav>
      <div className="flex justify-between items-center mx-5">
        <h1 className="text-2xl font-bold">Tasks List</h1>
        <button className="text-white bg-[#28a745] py-2.5 px-5 rounded-lg">
          Add task
        </button>
      </div>
      {/* <TodoInput title={title} setTitle={setTitle} /> */}

      <TodoItem />
    </div>
  );
};

const styles = {
  // container: {
  //   maxWidth: 500,
  //   margin: "40px auto"
  //   padding: 20,
  //   backgroundColor: "#fff",
  //   borderRadius: 8,
  //   boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  // },
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
