import { useDispatch } from "react-redux";
import {
  addNewTodo,
  clearEditTodoItem,
  editTodo,
  resetAddTodo,
  resetEditTodo,
  setEditMode,
} from "../redux/todos/todoSlide.jsx";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hook.jsx";
import { toast } from "react-toastify";

const TodoInput = (props) => {
  const { title, setTitle } = props;
  const dispatch = useAppDispatch();
  const isEditMode = useAppSelector((state) => state.todos.isEditMode);
  const editTodoItem = useAppSelector((state) => state.todos.editTodoItem);

  const isEditSuccess = useAppSelector((state) => state.todos.isEditSuccess);
  console.log(editTodoItem);

  useEffect(() => {
    if (isEditSuccess) {
      setTitle("");
      dispatch(setEditMode(false));
      dispatch(clearEditTodoItem());
      dispatch(resetEditTodo());
    }
  }, [isEditSuccess]);

  useEffect(() => {
    if (isEditMode && editTodoItem) {
      setTitle(editTodoItem.title);
    } else {
      // Đặt lại title khi không còn ở chế độ chỉnh sửa
      setTitle("");
    }
  }, [isEditMode, editTodoItem, setTitle]);

  const handleAddNewTodo = () => {
    if (title.trim() === "") {
      alert("title can not be empty");
      return;
    }
    dispatch(addNewTodo({ title }));
  };
  const handleEditTodo = () => {
    if (!editTodoItem) return;
    dispatch(
      editTodo({
        id: editTodoItem.id,
        title,
      })
    );
  };
  return (
    <>
      {!isEditMode ? (
        <div style={styles.inputContainer} className="p-5">
          <input
            type="text"
            placeholder="Nhập việc cần làm..."
            style={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={() => handleAddNewTodo()} style={styles.addButton}>
            Thêm
          </button>
        </div>
      ) : (
        <div style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Nhập việc cần làm..."
            style={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={() => handleEditTodo()} style={styles.addButton}>
            Lưu
          </button>
          <button
            onClick={() => dispatch(setEditMode(false))}
            style={styles.addButton}
          >
            Huỷ
          </button>
        </div>
      )}
    </>
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

export default TodoInput;
