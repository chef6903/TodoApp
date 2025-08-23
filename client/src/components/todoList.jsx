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
import ModalAddTodo from "./modalAddTodo.jsx";
import Header from "./Header.jsx";

const TodoApp = () => {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.listTodos);
  const { isAuthenticated, userData } = useAppSelector((state) => state.users);
  const [newTodo, setNewTodo] = useState("");

  const [activeTab, setActiveTab] = useState("today");
  const [isOpenModal, setIsOpenModal] = useState(false);

  // const filteredTodos = (todos || []).filter((todo) => {
  //   if (activeTab === "today") return !todo.completed;
  //   if (activeTab === "pending") return !todo.completed;
  //   if (activeTab === "completed") return todo.completed;
  //   return true;
  // });

  const handleModalAddTodo = () => {
    if (!isAuthenticated) {
      alert("Bạn cần đăng nhập");
      return;
    }
    setIsOpenModal(true);
  };

  return (
    <div>
      <div className="max-w-lg my-10 mx-auto rounded-lg bg-[#fff] shadow mt-12">
        <h2 className="mb-4 text-center bg-[#2F6A34] text-white text-2xl py-3">
          📝 My Tasks
        </h2>
        <nav class="flex justify-center space-x-2 my-4 mb-10">
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
          <button
            onClick={() => handleModalAddTodo()}
            className="text-white bg-[#28a745] py-2.5 px-5 rounded-lg"
          >
            Add task
          </button>
        </div>
        {/* <TodoInput title={title} setTitle={setTitle} /> */}
        <ModalAddTodo
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
        <TodoItem />
      </div>
    </div>
  );
};

export default TodoApp;
