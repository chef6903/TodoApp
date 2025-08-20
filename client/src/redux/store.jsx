import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todos/todoSlide.jsx";

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
