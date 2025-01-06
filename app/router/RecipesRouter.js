const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/RecipesController");

router.post("/create-recipe", recipeController.createRecipe);
router.get("/recipes", recipeController.getAllRecipe);
router.get("/recipes/author/:id", recipeController.getAllRecipeByAuthor);
router.patch("/recipe/add-review/:id", recipeController.addReview);
router.get("/recipes/:id", recipeController.getSingleRecipeById);
router.put("/recipes/:id", recipeController.updateSingleRecipe);
router.delete("/recipes/:id", recipeController.deleteRecipe);

module.exports = router;
