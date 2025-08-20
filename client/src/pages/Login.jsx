// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { AppContext } from "../context/AppContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// const Login = () => {
//   const [state, setState] = useState("Sign up");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

//   const navigate = useNavigate();

//   const onSubmitHandle = async (e) => {
//     try {
//       e.preventDefault();
//       axios.defaults.withCredentials = true;
//       if (state === "Sign up") {
//         const { data } = await axios.post(backendUrl + "/api/auth/register", {
//           name,
//           email,
//           password,
//         });
//         if (data.success) {
//           setIsLoggedin(true);
//           getUserData();
//           navigate("/");
//           toast.success("Register successfully");
//         } else {
//           toast.error(data.message);
//         }
//       } else {
//         const { data } = await axios.post(backendUrl + "/api/auth/login", {
//           email,
//           password,
//         });
//         if (data.success) {
//           setIsLoggedin(true);
//           getUserData();
//           navigate("/");
//         } else {
//           toast.error(data.message);
//         }
//       }
//     } catch (error) {
//       toast.error("error");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
//       <img
//         onClick={() => navigate("/")}
//         src={assets.logo}
//         alt=""
//         className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
//       />
//       <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
//         <h2 className="text-3xl font-semibold text-white text-center mb-3">
//           {state === "Sign up" ? "Create Account" : "Login"}
//         </h2>
//         <p className="text-center text-sm mb-5">
//           {state === "Sign up"
//             ? "Create your account"
//             : "Login to your account!"}
//         </p>
//         <form onSubmit={onSubmitHandle}>
//           {state === "Sign up" && (
//             <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C] ">
//               <img src={assets.person_icon} alt="" />
//               <input
//                 onChange={(e) => setName(e.target.value)}
//                 className="bg-transparent outline-none"
//                 type="text"
//                 placeholder="Full Name"
//                 required
//                 autoComplete="off"
//                 value={name}
//               />
//             </div>
//           )}

//           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//             <img src={assets.mail_icon} alt="" />
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               className="bg-transparent outline-none"
//               type="email"
//               placeholder="Email"
//               required
//               autoComplete="new-email"
//               value={email}
//             />
//           </div>
//           <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
//             <img src={assets.lock_icon} alt="" />
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               className="bg-transparent outline-none"
//               type="password"
//               placeholder="Password"
//               required
//               autoComplete="new-password"
//               value={password}
//             />
//           </div>
//           <p
//             onClick={() => navigate("/reset-password")}
//             className="mb-3 ml-1 text-indigo-300 cursor-pointer"
//           >
//             Forgot password
//           </p>
//           <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white font-medium">
//             {state}
//           </button>
//         </form>
//         {state === "Sign up" ? (
//           <p className="text-gray-400 text-center text-xs mt-4">
//             Already have an account? {""}
//             <span
//               onClick={() => setState("Login")}
//               className="text-blue-400 cursor-pointer underline"
//             >
//               Login here
//             </span>
//           </p>
//         ) : (
//           <p className="text-gray-400 text-center text-xs mt-4">
//             Don't have an account? {""}
//             <span
//               onClick={() => setState("Sign up")}
//               className="text-blue-400 cursor-pointer underline"
//             >
//               Sign up
//             </span>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;
