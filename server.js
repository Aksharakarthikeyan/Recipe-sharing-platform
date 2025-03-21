const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Use built-in express.json() middleware instead of body-parser
app.use(express.json());

// Connect to MongoDB (removed deprecated options)
mongoose.connect('mongodb://localhost:27017/demo')

  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Import Item Model
const Item = require('./models/item');

// CREATE: Add a new item
app.post('/items', async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem); // Respond with the saved item
  } catch (err) {
    res.status(400).json({ message: err.message }); // Bad request if error occurs
  }
});

// READ: Get all items
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find(); // Fetch all items
    res.status(200).json(items); // Respond with the list of items
  } catch (err) {
    res.status(500).json({ message: err.message }); // Server error if error occurs
  }
});

// READ: Get a single item by ID
app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id); // Find item by ID
    if (!item) return res.status(404).json({ message: 'Item not found' }); // Item not found
    res.status(200).json(item); // Respond with the found item
  } catch (err) {
    res.status(500).json({ message: err.message }); // Server error if error occurs
  }
});

// UPDATE: Update an item by ID
app.put('/items/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update item by ID
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' }); // Item not found
    res.status(200).json(updatedItem); // Respond with the updated item
  } catch (err) {
    res.status(400).json({ message: err.message }); // Bad request if error occurs
  }
});

// DELETE: Remove an item by ID
app.delete('/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id); // Delete item by ID
    if (!deletedItem) return res.status(404).json({ message: 'Item not found' }); // Item not found
    res.status(200).json({ message: 'Item deleted successfully' }); // Respond with success message
  } catch (err) {
    res.status(500).json({ message: err.message }); // Server error if error occurs
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});