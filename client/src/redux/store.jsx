import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todos/todoSlide.jsx";
import userReducer from "./todos/userSlide.jsx";

const store = configureStore({
  reducer: {
    todos: todosReducer,
    users: userReducer,
  },
});

export default store;
