import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/HomePage";

const ChatLayout = lazy(() => import("./pages/ChatLayout"));
const Profile = lazy(() => import("./pages/Profile"));

const Dashboard = lazy(() => import("./pagess/Dashboard/DashboardPage"));
const Problems = lazy(() => import("./pagess/Problems/ProblemsPage"));
const Notes = lazy(() => import("./pagess/Notes/Notespage"));
const Solve = lazy(() => import("./pagess/Solve/SolvePage"));

const PageLayout = lazy(() => import("./components/layout/PageLayout"));

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

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
          <Route path="/" element={<HomePage />} />

          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route path="/dashboard" element={<WithLayout Component={Dashboard} />} />
          <Route path="/problems" element={<WithLayout Component={Problems} />} />
          <Route path="/notes" element={<WithLayout Component={Notes} />} />

          <Route
            path="/solve/:id"
            element={
              <ProtectedRoute>
                <Solve />
              </ProtectedRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatLayout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

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