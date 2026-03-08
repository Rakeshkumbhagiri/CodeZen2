// import { useState } from "react";
// import AuthModal from "./AuthModal";

// const Navbar = () => {
//   const [authOpen, setAuthOpen] = useState(false);
//   const [mode, setMode] = useState("login"); // login | register

//   return (
//     <>
//       <nav className="flex items-center justify-between px-8 py-4 text-white bg-slate-900">
//         <h1 className="text-2xl font-bold text-green-400">CodeZen</h1>

//         <div className="flex items-center gap-6">
//           <button
//             onClick={() => {
//               setMode("login");
//               setAuthOpen(true);
//             }}
//             className="px-4 py-1 border rounded hover:bg-white hover:text-black"
//           >
//          Sign In
//           </button>

//           <button
//             onClick={() => {
//               setMode("register");
//               setAuthOpen(true);
//             }}
//             className="px-4 py-1 bg-green-500 rounded hover:bg-green-600"
//           >
//             Sign Up
//           </button>
//         </div>
//       </nav>

//       {authOpen && <AuthModal mode={mode} close={() => setAuthOpen(false)} />}
//     </>
//   );
// };

// export default Navbar;


import { useState, useEffect, useRef } from "react";
import AuthModal from "./AuthModal";


const Navbar = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4 text-white bg-slate-900">
        
          <img className="w-10 h-10" src="./assets/my-icon.png" alt="logo"></img>
       <div className="-ml-44">
        <h1 className="items-start text-2xl font-bold text-green-400 -ml-96 font-logo ">CodeZen</h1>
       </div>
        <div className="flex items-center gap-6">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  setMode("login");
                  setAuthOpen(true);
                }}
                className="px-4 py-1 border rounded hover:bg-white hover:text-black"
              >
                Sign In
              </button>

              <button
                onClick={() => {
                  setMode("register");
                  setAuthOpen(true);
                }}
                className="px-4 py-1 bg-green-500 rounded hover:bg-green-600"
              >
                Sign Up
              </button>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Profile Icon */}
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-center w-10 h-10 text-black bg-green-400 rounded-full cursor-pointer"
              >
                👤
              </div>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 w-40 mt-2 text-black bg-white rounded shadow-lg">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      window.location.href = "/profile";
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      window.location.href = "/settings";
                    }}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-300"
                  >
                    Settings
                  </button>

                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {authOpen && <AuthModal mode={mode} close={() => setAuthOpen(false)} />}
    </>
  );
};

export default Navbar;
