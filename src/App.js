import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/authentication/Auth";
import NavBar2 from "./components/NavBar2/NavBar2";
import FooterMenu from "./components/footer/FooterMenu";
import PageRoutes from "./configs/routes/PageRoutes";
import ComponentRoutes from "./configs/routes/ComponentRoutes";
import AppRoutes from "./configs/routes/AppRoutes";

function App() {
  const { user, token, logout } = useAuth();
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("visitor");
  console.log(user?.userId);

  return (
    <div className="main-outer-container">
      <NavBar2 isLoggedIn={!!token} userRole={userRole} handleLogout={logout} />
      <div className="main-content-container">
        <Routes>
          <Route path="/*" element={<PageRoutes />} />
          <Route path="/*" element={<ComponentRoutes />} />
          <Route
            path="/*"
            element={<AppRoutes isLoggedIn={!!token} userRole={userRole} />}
          />
        </Routes>
      </div>
      <footer className="main-footer">
        <FooterMenu isLoggedIn={!!token} userName={userName} />
      </footer>
    </div>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
