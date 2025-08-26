import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiTodo } from "../../../service/api";

const API_URL = "http://localhost:3001/todos";

export const fetchListTodos = createAsyncThunk(
  "todos/fetchListTodos",
  async () => {
    try {
      const res = await apiTodo.get("/");
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
        thunkAPI.dispatch(fetchListTodos()); // fetch lại danh sách
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
      thunkAPI.dispatch(fetchListTodos());
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
      thunkAPI.dispatch(fetchListTodos());
    }
    return res.data;
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async (payload, thunkAPI) => {
    const res = await apiTodo.put(`/update/${payload._id}`, payload);
    const data = res.data;
    console.log("check data: ", data);

    if (data.success) {
      //create succeed
      thunkAPI.dispatch(fetchListTodos());
    }
    return data;
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
    });
    builder.addCase(addNewTodo.fulfilled, (state, action) => {
      // Add user to the state array
      state.isAddNewSuccess = true;
    });
    builder.addCase(finishTodo.fulfilled, (state, action) => {
      // Add user to the state array
      state.isFinishSuccess = true;
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
