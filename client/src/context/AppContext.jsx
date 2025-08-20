// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// export const AppContext = createContext();

// export const AppContextProvider = (props) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [isLoggedin, setIsLoggedin] = useState(false);
//   const [userData, setUserData] = useState(false);
//   const [loading, setLoading] = useState(true);
//   axios.defaults.withCredentials = true;
//   const getAuthState = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
//       if (data.success) {
//         setIsLoggedin(true);
//         getUserData();
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false); // 👈 sau khi check xong thì bỏ loading
//     }
//   };

//   const getUserData = async () => {
//     try {
//       const { data } = await axios.get(backendUrl + "/api/user/data");
//       data.success ? setUserData(data.userData) : toast.error(data.message);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Something went wrong");
//     }
//   };

//   useEffect(() => {
//     getAuthState();
//   }, []);

//   const value = {
//     backendUrl,
//     isLoggedin,
//     setIsLoggedin,
//     userData,
//     setUserData,
//     getUserData,
//     loading,
//   };
//   return (
//     <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
//   );
// };
