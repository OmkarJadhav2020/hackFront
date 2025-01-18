import React from "react";
import { useNavigate } from "react-router-dom";

const BorrowerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role"); // Clear authentication
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome to User Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default BorrowerDashboard;
