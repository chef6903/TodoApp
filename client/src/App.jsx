import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAuthState } from "./redux/todos/userSlide";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAuthState()); // check login khi F5
  }, [dispatch]);

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
