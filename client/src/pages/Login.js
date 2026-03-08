// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// export default function Login({ setToken }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const login = async () => {
//     try {
//       const res = await api.post("/api/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", res.data.token);
//       setToken(res.data.token);

//       navigate("/chat"); // 🔥 THIS MAKES IT WORK
//     } catch {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="p-6 bg-white rounded shadow w-80">
//         <h1 className="mb-4 text-2xl text-center">
//           Login
//         </h1>

//         <input
//           className="w-full p-2 mb-3 border"
//           placeholder="Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           className="w-full p-2 mb-3 border"
//           placeholder="Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button
//           onClick={login}
//           className="w-full py-2 text-white bg-blue-600 rounded"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }
