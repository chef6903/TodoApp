import React, { useContext } from "react";
import Header from "../components/Header";
import TodoApp from "../components/todoList";

const Home = () => {
  return (
    <div>
      <Header />
      <TodoApp />
    </div>
  );
};

export default Home;
