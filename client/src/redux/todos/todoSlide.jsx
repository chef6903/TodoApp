import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiTodo } from "../../../service/api";

const API_URL = "http://localhost:3001/todos";

export const fetchListTodos = createAsyncThunk(
  "todos/fetchListTodos",
  async ({ page = 1, limit = 5, status = "all" } = {}) => {
    try {
      const res = await apiTodo.get(
        `/?page=${page}&limit=${limit}&status=${status}`
      );
      return res.data;
    } catch (error) {
      console.error("Fetch todos failed:", error);
      throw error;
    }
  }
);
export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (payload, thunkAPI) => {
    try {
      const res = await apiTodo.post("/create", payload);

      const data = res.data;

      if (data.success && data.todo) {
        const state = thunkAPI.getState();
        const { page, limit, status } = state.todos.pagination;
        thunkAPI.dispatch(fetchListTodos({ page, limit, status }));
      }

      return data.todo;
    } catch (error) {
      console.error("Add new todo failed:", error);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const finishTodo = createAsyncThunk(
  "todos/finishTodo",
  async (payload, thunkAPI) => {
    const res = await apiTodo.post(`/finish/${payload._id}`);
    const data = res.data;
    if (data.success) {
      //create succeed
      const state = thunkAPI.getState();
      const { page, limit, status } = state.todos.pagination;
      thunkAPI.dispatch(fetchListTodos({ page, limit, status }));
    }
    return data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (payload, thunkAPI) => {
    const res = await apiTodo.delete(`/delete/${payload._id}`);
    const data = res.data;
    if (data.success) {
      const state = thunkAPI.getState();
      const { page, limit, status } = state.todos.pagination;
      thunkAPI.dispatch(fetchListTodos({ page, limit, status }));
    }
    return res.data;
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async (payload, thunkAPI) => {
    const res = await apiTodo.put(`/update/${payload._id}`, payload);
    const data = res.data;
    if (data.success) {
      const state = thunkAPI.getState();
      const { page, limit, status } = state.todos.pagination;
      thunkAPI.dispatch(fetchListTodos({ page, limit, status }));
    }
    return res.data;
  }
);

const initialState = {
  listTodos: [],
  isAddNewSuccess: false,
  isEditSuccess: false,
  isDeleteSuccess: false,
  isFinishSuccess: false,
  isEditMode: false,
  editTodoItem: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1,
    status: "all",
  },
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    resetAddTodo(state) {
      state.isAddNewSuccess = false;
    },
    resetEditTodo(state) {
      state.isEditSuccess = false;
    },
    setEditMode: (state, action) => {
      state.isEditMode = action.payload;
    },
    finishEditMode: (state, action) => {
      state.isEditMode = false;
    },
    setEditTodoItem: (state, action) => {
      state.editTodoItem = action.payload;
    },
    clearEditTodoItem: (state) => {
      state.editTodoItem = null;
    },
    clearTodos: (state) => {
      state.listTodos = [];
      state.isAddNewSuccess = false;
      state.isEditSuccess = false;
      state.isDeleteSuccess = false;
      state.isFinishSuccess = false;
      state.isEditMode = false;
      state.editTodoItem = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListTodos.fulfilled, (state, action) => {
      // Add user to the state array
      state.listTodos = action.payload.todos;
      state.pagination = action.payload.pagination;
      state.pagination.status = action.meta.arg?.status || "all";
    });
    builder.addCase(addNewTodo.fulfilled, (state, action) => {
      state.isAddNewSuccess = true;
    });
    builder.addCase(finishTodo.fulfilled, (state, action) => {
      state.isFinishSuccess = true;
      const updatedTodo = action.payload.todo;
      if (!updatedTodo) return;

      if (state.pagination.status === "pending" && updatedTodo.completed) {
        state.listTodos = state.listTodos.filter(
          (t) => t._id !== updatedTodo._id
        );
        return;
      }

      if (state.pagination.status === "completed" && !updatedTodo.completed) {
        state.listTodos = state.listTodos.filter(
          (t) => t._id !== updatedTodo._id
        );
        return;
      }

      // Còn lại thì chỉ cần update tại chỗ
      state.listTodos = state.listTodos.map((t) =>
        t._id === updatedTodo._id ? updatedTodo : t
      );
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      // Add user to the state array
      state.isDeleteSuccess = true;
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      // Add user to the state array
      state.isEditSuccess = true;
    });
  },
});

export const {
  resetAddTodo,
  resetEditTodo,
  setEditMode,
  finishEditMode,
  clearEditTodoItem,
  setEditTodoItem,
  clearTodos,
} = todoSlice.actions;

export default todoSlice.reducer;
