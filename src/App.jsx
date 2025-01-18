import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserLogin from "./pages/UserLogin";
import AdminLogin from "./pages/AdminLogin";
import UserSignup from "./pages/UserSignUp";
import InvestorDashboard from "./pages/InvestorDashboard";
import BorrowerDashboard from "./pages/BorrowerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useState ,useEffect} from "react";
import KYC from "./pages/kyc";
import Cookies from 'js-cookie'
import LoanSection from "./pages/LoanSection";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(Cookies.get("role"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(Cookies.get("role"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />

        <Route
          path="/investor-dashboard"
          element={
            isAuthenticated === "Investor" ? <InvestorDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/borrower-dashboard"
          element={
            isAuthenticated === "Borrower" ? <BorrowerDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            isAuthenticated === "Admin" ? <AdminDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/kyc"
          element={
            isAuthenticated !== null ?  <KYC /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/loanapply"
          element={
            isAuthenticated !== null ?  <LoanSection /> : <Navigate to="/login" />
          }
        />
        {/* <Route path="*" element={<Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
};


export default App;
