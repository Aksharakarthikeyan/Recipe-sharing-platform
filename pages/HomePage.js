import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import Link & useNavigate
import "./HomePage.css"; // Import the CSS file

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  const recipes = [
    { title: "Spaghetti Carbonara", image: "https://unsplash.com/photos/pasta-dish-on-white-ceramic-plate--5FECW242og", id: 1 },
    { title: "Chicken Alfredo", image: "https://unsplash.com/photos/fried-chicken-gE28aTnlqJA", id: 2 },
    { title: "Vegetarian Stir-fry", image: "https://www.istockphoto.com/photo/steaming-mixed-vegetables-in-the-wok-asian-style-cooking-gm588595864-101079665?utm_campaign=srp_photos_top&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2FVegetarian-Stir-fry&utm_medium=affiliate&utm_source=unsplash&utm_term=Vegetarian+Stir+fry%3A%3A%3A", id: 3 },
    // Add more recipe objects here as needed
  ];

  const handleSearch = () => {
    alert(`Searching for: ${searchTerm}`);
  };

  const handleLogin = () => {
    navigate("/LoginPage"); // Redirect to LoginPage
  };

  const handleCreateRecipe = () => {
    console.log("Navigating to Add Recipe Page...");
    navigate("/AddRecipePage"); // Redirect to AddRecipePage
  };

  const handleSavedRecipes = () => {
    navigate("/RecipePage"); // Redirect to RecipePage
  };

  return (
    <div className="home-container">
      {/* Top Section: Search Bar + Navigation + Login Button */}
      <div className="top-section">
        {/* Search Bar in the Left Corner */}
        <div className="search-container">
          <input
            type="text"
            className="search-bar"
            placeholder="Search recipe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* Navigation Bar (Centered) */}
        <nav className="navbar">
          <Link to="/">Home</Link>
          <button className="nav-btn" onClick={handleCreateRecipe}>
            Create Recipe
          </button>
          <button className="nav-btn" onClick={handleSavedRecipes}>
            Saved Recipes
          </button>
        </nav>

        {/* Login Button (Right Corner) */}
        <div className="top-right">
          <button className="btn login-btn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>

      <h1>Welcome to the Recipe Sharing Platform</h1>

      {/* Recipe List Section */}
      <div className="recipe-list">
        <h2>Featured Recipes</h2>
        <div className="recipes-container">
          {recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-image"
              />
              <h3>{recipe.title}</h3>
              <button
                className="view-recipe-btn"
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              >
                View Recipe
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
