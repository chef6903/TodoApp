import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
// import ResetPassword from "./pages/ResetPassword";
// import Login from "./pages/Login";
// import EmailVerify from "./pages/EmailVerify";
import { ToastContainer } from "react-toastify";
import TodoApp from "./components/todoList";
const App = () => {
  // const { loading } = useContext(AppContext);

  // // Hiển thị một màn hình tải toàn cục nếu đang trong quá trình loading
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-screen">
  //       Đang tải...
  //     </div>
  //   );
  // }

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<TodoApp />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} /> */}
      </Routes>
    </div>
  );
};

export default App;
