import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddRecipePage.css"; // Ensure CSS file is linked

const AddRecipePage = () => {
  const [recipe, setRecipe] = useState({ title: "", ingredients: "", steps: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recipe Saved:", recipe);
    navigate("/"); // ✅ Navigate back to home after saving
  };

  return (
    <div className="add-recipe-container">
      <h1>Add New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>Title: <input type="text" name="title" value={recipe.title} onChange={handleChange} required /></label>
        <label>Ingredients: <textarea name="ingredients" value={recipe.ingredients} onChange={handleChange} required /></label>
        <label>Steps: <textarea name="steps" value={recipe.steps} onChange={handleChange} required /></label>
        <button type="submit">Save Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipePage;
