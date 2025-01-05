const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: { type: Number, required: true },
  reviewText: { type: String, required: true },
  reviewDate: { type: Date, default: Date.now },
});

const recipeSchema = new mongoose.Schema({
  image: { type: String, required: true }, // URL or path to the recipe image
  title: { type: String, required: true },
  method: [String], // Step-by-step instructions (array of strings)
  ingredients: [{ name: String, quantity: String }], // List of ingredients, each with a name and quantity
  servings: { type: Number, required: true }, // Number of servings
  category: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviews: [reviewSchema],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
