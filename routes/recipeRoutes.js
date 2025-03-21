const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const Recipe = require("../models/Recipe"); // Ensure you have this model

const router = express.Router();
router.get("/", async (req, res) => {
  try {
      const recipes = await Recipe.find();
      res.json(recipes);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// ✅ Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"), // Save images in 'uploads/' folder
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// ✅ Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token" });
  }
};

// ✅ GET all recipes (Public Route)
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ POST: Add a new recipe (Protected Route)
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const image = req.file ? req.file.path : ""; // Image path from uploads

    const recipe = new Recipe({
      title,
      ingredients,
      instructions,
      image,
      createdBy: req.user._id, // Assign logged-in user as creator
    });

    await recipe.save();
    res.json({ message: "✅ Recipe added successfully", recipe });
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to add recipe" });
  }
});

// ✅ PUT: Update a recipe (Protected Route)
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const image = req.file ? req.file.path : undefined;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { title, ingredients, instructions, ...(image && { image }) },
      { new: true }
    );

    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to update recipe" });
  }
});

// ✅ DELETE: Remove a recipe (Protected Route)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ Recipe deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to delete recipe" });
  }
});

module.exports = router;
