import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiAuth, apiUser } from "../../../service/api";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apiUser.get("/data"); // API: /api/users/me
      if (data.success) {
        return data.user; // backend trả { success, user }
      } else {
        return rejectWithValue(data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  user: {
    username: "",
    email: "",
  },
  isAuthenticated: false,
  userData: null,
};

const userSlide = createSlice({
  name: "users",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
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
    clearUserData: (state) => {
      // 🟢 khi logout dùng cái này
      state.userData = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.userData = action.payload;
      console.log(
        "✅ Redux userData (sau khi login/getUserData):",
        action.payload
      );
    });
  },
});

export const { setIsAuthenticated, clearUserData } = userSlide.actions;

export default userSlide.reducer;
