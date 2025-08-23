import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { apiAuth, apiUser } from "../../service/api";
import { useAppSelector } from "../redux/hook";
import { useDispatch } from "react-redux";
import { getUserData, setIsAuthenticated } from "../redux/todos/userSlide";
const Login = () => {
  const [state, setState] = useState("Sign up");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isAuthenticated = useAppSelector(
    (state) => state.users.isAuthenticated
  );

  const userData = useAppSelector((state) => state.users.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      console.log("✅ Redux userData sau khi login/getUserData:", userData);
    }
  }, [userData]);

  const onSubmitHandle = async (e) => {
    try {
      e.preventDefault();
      if (state === "Sign up") {
        const { data } = await apiAuth.post("/register", {
          username,
          email,
          password,
        });
        if (data.success) {
          dispatch(setIsAuthenticated(true));
          dispatch(getUserData());
          navigate("/");
          toast.success("Register successfully");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await apiAuth.post("/login", {
          email,
          password,
        });
        if (data.success) {
          dispatch(setIsAuthenticated(true));
          dispatch(getUserData());
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Lỗi server, vui lòng thử lại");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gray-100 ">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full sm:w-96 text-gray-700 text-sm border border-gray-200">
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-3">
          {state === "Sign up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-5 text-gray-500">
          {state === "Sign up"
            ? "Create your account"
            : "Login to your account!"}
        </p>
        <form onSubmit={onSubmitHandle}>
          {state === "Sign up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-100 border border-gray-300">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setUserName(e.target.value)}
                className="bg-transparent outline-none"
                type="text"
                placeholder="Full Name"
                required
                autoComplete="off"
                value={username}
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-100 border border-gray-300">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none"
              type="email"
              placeholder="Email"
              required
              autoComplete="new-email"
              value={email}
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gray-100 border border-gray-300">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none"
              type="password"
              placeholder="Password"
              required
              autoComplete="new-password"
              value={password}
            />
          </div>

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:opacity-90 transition">
            {state}
          </button>
        </form>
        {state === "Sign up" ? (
          <p className="text-gray-500 text-center text-xs mt-4">
            Already have an account? {""}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-blue-400 text-center text-xs mt-4">
            Don't have an account? {""}
            <span
              onClick={() => setState("Sign up")}
              className="text-gray-500 cursor-pointer underline"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
