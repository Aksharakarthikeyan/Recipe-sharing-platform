import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Keeping folder structure
import AddRecipePage from "./pages/AddRecipePage";
import RecipePage from "./pages/RecipePage"; // ✅ Ensure this is included
import LoginPage from "./pages/LoginPage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/AddRecipePage" element={<AddRecipePage />} />
        <Route path="/RecipePage" element={<RecipePage />} />
        <Route path="/LoginPage" element={<LoginPage />} />

      </Routes>
    </Router>
  );
};

export default App;
