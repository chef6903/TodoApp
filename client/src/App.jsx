import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
// import ResetPassword from "./pages/ResetPassword";
// import Login from "./pages/Login";
// import EmailVerify from "./pages/EmailVerify";
import { ToastContainer } from "react-toastify";
import TodoApp from "./components/todoList";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuthState } from "./redux/todos/userSlide";
const App = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAuthState()); // check login khi F5
  }, [dispatch]);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} /> */}
      </Routes>
    </div>
  );
};

export default App;
