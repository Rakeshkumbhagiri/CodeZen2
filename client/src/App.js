import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense,lazy } from "react";

import HomePage from "./pages/HomePage";
const Login = lazy(() => import("./pages/Login"));
const ChatLayout = lazy(() => import("./pages/ChatLayout"));
const Profile = lazy(() => import("./pages/Profile"));

// ✅ ProtectedRoute wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Suspense fallback="Loading...">
    <Routes>
      {/* Home → Get Started */}
      <Route path="/" element={<HomePage />} />

      {/* Login */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/chat" replace />
          ) : (
            <Login />
          )
        }
      />

      {/* Protected Chat */}
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatLayout />
          </ProtectedRoute>
        }
      />

      {/* Protected Profile */}
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
  );
}

export default App;
