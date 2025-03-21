import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './RecipePage.css'; // Import the CSS file

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, []);

  // Function to delete a recipe
  const deleteRecipe = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`);
      setRecipes(recipes.filter(recipe => recipe._id !== id));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="recipe-container">
      <h2>Recipes</h2>
      <div className="recipe-list">
        {recipes.map(recipe => (
          <div key={recipe._id} className="recipe-card">
            <h3>{recipe.title}</h3>
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>

            {recipe.image && (
              <img src={`http://localhost:5000/${recipe.image}`} alt={recipe.title} className="recipe-image" />
            )}

            <div className="recipe-actions">
              <Link to={`/edit-recipe/${recipe._id}`} className="btn edit-btn">Edit</Link>
              <button onClick={() => deleteRecipe(recipe._id)} className="btn delete-btn">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipePage;
