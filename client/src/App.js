// import { Routes, Route, Navigate } from "react-router-dom";
// import { Suspense,lazy } from "react";
// import { useEffect } from "react";

// //newly added
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import HomePage from "./pages/HomePage";
// const Login = lazy(() => import("./pages/Login"));
// const ChatLayout = lazy(() => import("./pages/ChatLayout"));
// const Profile = lazy(() => import("./pages/Profile"));

// const Dashboard = lazy(() => import("./pagess/Dashboard/DashboardPage"));
// const Problems = lazy(() => import("./pagess/Problems/ProblemsPage"));
// const Notes = lazy(() => import("./pagess/Notes/Notespage"));
// const Solve = lazy(() => import("./pagess/Solve/SolvePage"));


// const  CodeEditor = lazy(() => import("./components/editor/CodeEditor"));
// const  LanguageSelector = lazy(() => import("./components/editor/LanguageSelector"));
// const  OutputConsole = lazy(() => import("./components/editor/OutputConsole"));

// const Navbar = lazy(() => import("./components/layout/Navbar"));
// const Sidebar = lazy(() => import("./components/layout/SideBar"));  
// const PageLayout = lazy(() => import("./components/layout/PageLayout"));

// const NotesPanel = lazy(() => import("./components/notes/NotesPanel"));
// const FilterBar = lazy(() => import("./components/FilterBar/FilterBar"));
// const ProblemCard = lazy(() => import("./components/ProblemCard/ProblemCard"));


// // ✅ ProtectedRoute wrapper
// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem("token");
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// function App() {
//   const isAuthenticated = !!localStorage.getItem("token");

//    // optional 
//    useEffect(() => {
//     fetch("https://codezen2-server.onrender.com")
//       .then(() => console.log("Backend awake"))
//       .catch(() => console.log("Wake failed"));
//   }, []);


//   return (
//     <>
//     <Suspense fallback="Loading...">
//     <Routes>
//       {/* Home → Get Started */}
//       <Route path="/" element={<HomePage />} />

//       {/* Login */}
//       <Route
//         path="/login"
//         element={
//           isAuthenticated ? (
//             <Navigate to="/chat" replace />
//           ) : (
//             <Login />
//           )
//         }
//       />

//       {/* Protected Chat */}
//       <Route
//         path="/chat"
//         element={
//           <ProtectedRoute>
//             <ChatLayout />
//           </ProtectedRoute>
//         }
//       />

//       {/* Protected Profile */}
//       <Route
//         path="/profile"
//         element={
//           <ProtectedRoute>
//             <Profile />
//           </ProtectedRoute>
//         }
//       />

//       {/* Fallback */}
//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//     </Suspense>

    
//       <ToastContainer
//         position="top-center"
//         autoClose={3000}
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//         theme="colored"
//       />
//       </>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useEffect } from "react";

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// existing pages
import HomePage from "./pages/HomePage";
const Login = lazy(() => import("./pages/Login"));
const ChatLayout = lazy(() => import("./pages/ChatLayout"));
const Profile = lazy(() => import("./pages/Profile"));

// ✅ dashboard pages (from cloned project)
const Dashboard = lazy(() => import("./pagess/Dashboard/DashboardPage"));
const Problems = lazy(() => import("./pagess/Problems/ProblemsPage"));
const Notes = lazy(() => import("./pagess/Notes/Notespage"));
const Solve = lazy(() => import("./pagess/Solve/SolvePage"));

// layout (optional but recommended)
const PageLayout = lazy(() => import("./components/layout/PageLayout"));

// ✅ ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// ✅ Wrapper for dashboard pages
const WithLayout = ({ Component }) => (
  <ProtectedRoute>
    <PageLayout>
      <Component />
    </PageLayout>
  </ProtectedRoute>
);

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  useEffect(() => {
    fetch("https://codezen2-server.onrender.com")
      .then(() => console.log("Backend awake"))
      .catch(() => console.log("Wake failed"));
  }, []);

  return (
    <>
      <Suspense fallback="Loading...">
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomePage />} />

          {/* Login */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login />
              )
            }
          />

          {/* ✅ Dashboard Flow (NEW) */}
          <Route path="/dashboard" element={<WithLayout Component={Dashboard} />} />
          <Route path="/problems" element={<WithLayout Component={Problems} />} />
          <Route path="/notes" element={<WithLayout Component={Notes} />} />

          {/* Solve page (optional full screen) */}
          <Route
            path="/solve/:id"
            element={
              <ProtectedRoute>
                <Solve />
              </ProtectedRoute>
            }
          />

          {/* Chat (UNCHANGED) */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatLayout />
              </ProtectedRoute>
            }
          />

          {/* Profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;