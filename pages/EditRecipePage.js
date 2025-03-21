import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditRecipePage.css'; // Import the CSS file

const EditRecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({ title: '', ingredients: '', instructions: '', image: null });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/recipes/${id}`)
      .then(response => setRecipe(response.data))
      .catch(error => console.error('Failed to fetch recipe', error));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', recipe.title);
    formData.append('ingredients', recipe.ingredients);
    formData.append('instructions', recipe.instructions);
    if (recipe.image) formData.append('image', recipe.image);

    try {
      await axios.put(`http://localhost:5000/api/recipes/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Recipe updated successfully!');
      navigate('/');
    } catch (error) {
      alert('Failed to update recipe');
    }
  };

  return (
    <div className="edit-recipe-container">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleUpdate} className="edit-recipe-form">
        <input type="text" value={recipe.title} onChange={(e) => setRecipe({ ...recipe, title: e.target.value })} required />
        <textarea value={recipe.ingredients} onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value })} required />
        <textarea value={recipe.instructions} onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value })} required />
        <input type="file" onChange={(e) => setRecipe({ ...recipe, image: e.target.files[0] })} />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipePage;
