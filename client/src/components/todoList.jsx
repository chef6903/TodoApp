import React, { useEffect, useState } from "react";
import { fetchListTodos } from "../redux/todos/todoSlide.jsx";
import { useAppDispatch, useAppSelector } from "../redux/hook.jsx";
import TodoItem from "./todoItem.jsx";
import ModalAddTodo from "./modalAddTodo.jsx";

const TodoApp = () => {
  const dispatch = useAppDispatch();
  const { listTodos, pagination } = useAppSelector((state) => state.todos);
  const { isAuthenticated } = useAppSelector((state) => state.users);

  const [activeTab, setActiveTab] = useState(
    () => localStorage.getItem("activeTab") || "today"
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 4;

  useEffect(() => {
    dispatch(fetchListTodos({ page, limit, status: activeTab }));
  }, [dispatch, page, limit, activeTab]);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

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
        <nav className="flex justify-center space-x-2 my-4 mb-10">
          {["all", "pending", "completed"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setPage(1); // reset về page 1 khi đổi tab
              }}
              className={`px-6 py-2 rounded-md font-medium ${
                activeTab === tab
                  ? "bg-green-900 text-white"
                  : "bg-green-200 text-black"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
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

        <TodoItem filteredTodos={listTodos} />
        <div className="flex justify-center space-x-2 my-4">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4 py-2">
            Page {pagination?.page} / {pagination?.totalPages}
          </span>
          <button
            disabled={page >= pagination?.totalPages}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
