import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateEditPost from "./pages/CreateEditPost";
import MyPosts from "./pages/MyPosts";
import PostDetail from "./pages/PostDetail";
import PrivateRoute from "./components/PrivateRoute";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div
          style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)",
          }}
        >
          <Navbar />
          <div
            style={{
              padding: "32px",
              maxWidth: "1200px",
              margin: "0 auto",
              minHeight: "calc(100vh - 80px)",
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/post/:id" element={<PostDetail />} />

              {/* PROTECTED */}
              <Route
                path="/create"
                element={
                  <PrivateRoute>
                    <CreateEditPost />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit/:id"
                element={
                  <PrivateRoute>
                    <CreateEditPost />
                  </PrivateRoute>
                }
              />
              <Route
                path="/myposts"
                element={
                  <PrivateRoute>
                    <MyPosts />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
