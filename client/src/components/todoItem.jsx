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
            <button
              style={styles.editButton}
              onClick={() => handleModalEditTodo(todo)}
            >
              ✏️
            </button>
            <button
              style={styles.deleteButton}
              onClick={() => handleDeleteTodo(todo)}
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

  // todoItem: {
  //   display: "flex",
  //   alignItems: "center",
  //   marginBottom: 10,
  //   padding: "8px 12px",
  //   backgroundColor: "#f9f9f9",
  //   borderRadius: 4,
  // },
  deleteButton: {
    marginLeft: 8,
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "6px 10px",
    cursor: "pointer",
  },
  editButton: {
    marginLeft: 8,
    color: "#fff",
    backgroundColor: "#d9d5d5ff",
    border: "none",
    borderRadius: 4,
    padding: "6px 11px",
    cursor: "pointer",
  },
};

export default TodoItem;
