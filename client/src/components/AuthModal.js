import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { motion } from "framer-motion";
// import { toast } from "react-toastify"; 
  

export default function AuthModal({ mode, close }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [currentMode, setCurrentMode] = useState(mode);

  const navigate = useNavigate();

  const submit = async () => {
    try {
      const endpoint =
        currentMode === "login"
          ? "/api/auth/login"
          : "/api/auth/register";

       const payload =
        currentMode === "login"
          ? { email, password }
          : { name, email, password };   // ✅ include name for register

      const res = await api.post(endpoint, payload);

      localStorage.setItem("token", res.data.token);
      close();
      if (currentMode === "login") {
        navigate("/chat");
      }
    } catch (err) {
      //  toast.error(err.message || "Invalid credentials");
      alert("Invalid Credentials");   
          // Toastify("Error: " + (err.response?.data?.message || err.message), "error");
    //       const message =
    // err.response?.data?.message || err.message || "Invalid credentials";

    // notifyError(message);
          
    }
  };

  return (
    
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <motion.div
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.3 }}
  className="relative p-6 shadow-lg w-96 bg-white/90 backdrop-blur-lg rounded-xl"
>
 

      {/* ❌ Close Button */}
      <button
        onClick={close}
        className="absolute text-xl text-gray-500 top-3 right-3 hover:text-black"
      >
        ✕
      </button>

      <h2 className="mb-4 text-2xl text-center">
        {currentMode === "login" ? "Sign In" : "Create Account"}
      </h2>
     {/* ✅ Show name field only when registering */}
        {currentMode === "register" && (
          <>
         <label className="block mb-1 text-sm font-medium text-gray-700">
              Name:
            </label>
          <input
            className="w-full p-2 mb-3 border rounded"
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
            </>
        )}
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Email:
        </label>
      <input
        className="w-full p-2 mb-3 border rounded"
        placeholder="Email@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
      />
        <label className="block mb-1 text-sm font-medium text-gray-700"> 
             Password:
         </label>
      <input
        type="password"
        className="w-full p-2 mb-3 border rounded"
        placeholder="xxxxxxxx"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full py-2 text-lg text-green-400 rounded bg-slate-800 hover:bg-slate-900"
      >
        {currentMode === "login" ? "Login" : "Register"}
      </button>

      <p className="mt-4 text-sm text-center">
        {currentMode === "login" ? (
          <>
            Don’t have an account?{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setCurrentMode("register")}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setCurrentMode("login")}
            >
              Sign in
            </button>
          </>
        )}
      </p>
    </motion.div>
    </div>
  
);

}
