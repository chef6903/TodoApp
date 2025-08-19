import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3001/todos";

export const fetchListTodos = createAsyncThunk(
  "todos/fetchListTodos",
  async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
  }
);

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (payload, thunkAPI) => {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({
        title: payload.title,
      }),
      headers: {
        "Content-Type": " application/json",
      },
    });
    const data = await res.json();
    if (data && data.id) {
      //create succeed
      thunkAPI.dispatch(fetchListTodos());
    }
    return data;
  }
);

export const finishTodo = createAsyncThunk(
  "todos/finishTodo",
  async (payload, thunkAPI) => {
    const res = await fetch(`${API_URL}/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...payload,
        completed: !payload.completed,
      }),
      headers: {
        "Content-Type": " application/json",
      },
    });
    const data = await res.json();
    if (data && data.id) {
      //create succeed
      thunkAPI.dispatch(fetchListTodos());
    }
    return data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (payload, thunkAPI) => {
    const res = await fetch(`${API_URL}/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": " application/json",
      },
    });
    const data = await res.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListTodos());
    }
    return data;
  }
);

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async (payload, thunkAPI) => {
    const res = await fetch(`${API_URL}/${payload.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: payload.title,
      }),
      headers: {
        "Content-Type": " application/json",
      },
    });
    const data = await res.json();
    if (data && data.id) {
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListTodos.fulfilled, (state, action) => {
      // Add user to the state array
      state.listTodos = action.payload;
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
} = todoSlice.actions;

export default todoSlice.reducer;
