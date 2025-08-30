import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiAuth, apiUser } from "../../../service/api";

export const getAuthState = createAsyncThunk(
  "user/getAuthState",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await apiAuth.get("/is-auth");
      if (data.success) {
        dispatch(getUserData());
        return true;
      } else {
        return rejectWithValue(false);
      }
    } catch (error) {
      return rejectWithValue(false);
    }
  }
);

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
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  userData: null,
  loading: true,
};

const userSlide = createSlice({
  name: "users",
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
      localStorage.setItem(
        "isAuthenticated",
        action.payload ? "true" : "false"
      );
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
      localStorage.removeItem("isAuthenticated");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.userData = action.payload;
        localStorage.setItem("isAuthenticated", "true");

        console.log(
          "✅ Redux userData (sau khi login/getUserData):",
          action.payload
        );
      })
      .addCase(getAuthState.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem("isAuthenticated", "true");
      })
      .addCase(getAuthState.rejected, (state) => {
        state.isAuthenticated = false;
        state.userData = null;
        state.loading = false;
        localStorage.removeItem("isAuthenticated");
      });
  },
});

export const { setIsAuthenticated, clearUserData } = userSlide.actions;

export default userSlide.reducer;
