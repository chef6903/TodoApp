import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook.jsx";
import {
  deleteTodo,
  fetchListTodos,
  finishTodo,
  setEditMode,
  setEditTodoItem,
} from "../redux/todos/todoSlide.jsx";
import ModalEditTodo from "./modalEdittodo.jsx";
import dayjs from "dayjs";

const TodoItem = (props) => {
  const { filteredTodos } = props;
  const todos = useAppSelector((state) => state.todos.listTodos);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchListTodos());
  }, []);

  const handleFinishTodo = (todo) => {
    dispatch(finishTodo(todo));
  };

  const handleDeleteTodo = (todo) => {
    dispatch(deleteTodo(todo));
  };

  const handleEditTodo = (todo) => {
    dispatch(setEditMode(true));
    dispatch(setEditTodoItem(todo));
  };

  if (!todos || todos.length === 0) {
    return <p className="text-center text-gray-500 my-8">No tasks yet 🚀</p>;
  }
  const handleModalEditTodo = (todo) => {
    dispatch(setEditTodoItem(todo));
    setIsOpenModal(true);
  };

  return (
    <div className="space-y-4">
      <ul className=" my-5 mx-5 pb-5">
        {filteredTodos.map((todo) => (
          <li
            key={todo._id}
            className={`flex justify-center items-center border-2 mb-2 bg-[#f9f9f9] rounded-[4px] px-3 py-2 ${
              todo.completed ? "line-through" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleFinishTodo(todo)}
            />
            <span style={{ flex: 1, marginLeft: 8 }}>{todo.title}</span>
            <span style={{ flex: 1, marginLeft: 8 }}>
              {dayjs(todo.dueDate).format("DD/MM/YYYY")}
            </span>{" "}
            <button
              className="ml-2 bg-[#d9d5d5ff] text-[#fff] border-none rounded-[4px] py-[6px] px-[10px]"
              onClick={() => handleModalEditTodo(todo)}
            >
              ✏️
            </button>
            <button
              onClick={() => handleDeleteTodo(todo)}
              className="ml-2 bg-[#dc3545] text-[#fff] border-none rounded-[4px] py-[6px] px-[10px]"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
      <ModalEditTodo
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </div>
  );
};

export default TodoItem;
