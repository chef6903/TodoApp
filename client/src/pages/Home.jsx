import React, { useContext } from "react";
import Header from "../components/Header";
import TodoApp from "../components/todoList";
import { useSelector } from "react-redux";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <TodoApp />
    </div>
  );
};

export default Home;
