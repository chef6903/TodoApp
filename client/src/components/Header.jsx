import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearUserData, setIsAuthenticated } from "../redux/todos/userSlide";
import { apiAuth } from "../../service/api";
import { clearTodos } from "../redux/todos/todoSlide";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.users.userData);
  const { isAuthenticated, hasCheckedAuth } = useSelector(
    (state) => state.users
  );
  const logout = async () => {
    try {
      const { data } = await apiAuth.post("/logout");
      data.success && dispatch(setIsAuthenticated(false));
      data.success && dispatch(clearUserData());
      data.success && dispatch(clearTodos());
      console.log("🚪 Redux userData (sau khi logout):", userData);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 relative top-0 ">
      <div
        onClick={() => navigate("/")}
        className="text-medium text-xl font-bold hover: cursor-pointer"
      >
        Todo App
      </div>
      {isAuthenticated && userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black text-white relative group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-white text-sm">
              <li
                onClick={logout}
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
              >
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 bg-white hover:bg-gray-100"
        >
          Get Started <img src={assets.arrow_icon} />
        </button>
      )}

      {/* )} */}
    </div>
  );
};

export default Header;
