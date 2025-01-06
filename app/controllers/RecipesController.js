const status = require("http-status");
const response = require("../utils/response");
const Recipe = require("../models/RecipesModel");

//create a recipe
const createRecipe = async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    const result = await newRecipe.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "New recipe created Successfully!",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.INTERNAL_SERVER_ERROR,
          "Error creating new recipe",
          error
        )
      );
  }
};

//get all recipe
const getAllRecipe = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category) {
      const categories = category.split(",").map((cat) => cat.trim());
      query.category = { $in: categories };
    }

    const result = await Recipe.find(query).populate(
      "author",
      "fullName photo"
    );
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "All recipe data retrieve successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.INTERNAL_SERVER_ERROR,
          "Error retrieving all donation",
          error
        )
      );
  }
};

const getAllRecipeByAuthor = async (req, res) => {
  try {
    //to get to see how many recipe the author has firstly we have to desctrure the id from req param and then populate whatever you need to show as the project requirements
    const { id } = req.params;
    // console.log(id);
    const result = await Recipe.find({ author: id }).populate(
      "author",
      "fullName photo email"
    );
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Author by Id found successfully!",
          result
        )
      );
    // console.log(result);
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.INTERNAL_SERVER_ERROR,
          "Error retrieving author by Id",
          error
        )
      );
  }
};

//get recipe by single Id
const getSingleRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Recipe.findById(id)
      .populate("author", "fullName photo")
      .populate("reviews.reviewerId", "fullName photo");

    if (!result) {
      res
        .status(status.status.NOT_FOUND)
        .send(response.status.status.NOT_FOUND, "Recipe by Id is not found");
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Recipe byId data retrieve successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error retrieving all recipes",
          error
        )
      );
  }
};

//update recipe
const updateSingleRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await Recipe.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!result) {
      res
        .status(status.status.NOT_FOUND)
        .send(response.status.status.NOT_FOUND, "Recipe by Id is not found");
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Recipe byId updated successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error updating recipe by single Id",
          error
        )
      );
  }
};

//delete recipe
const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Recipe.findByIdAndDelete(id, { new: true });
    if (!result) {
      res
        .status(status.status.NOT_FOUND)
        .send(response.status.status.NOT_FOUND, "Recipe not found");
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Recipe deleted successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured deleting Recipe",
          error
        )
      );
  }
};

const addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) {
      res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "Recipe not found"
          )
        );
    }
    console.log(recipe);
    const newReview = req.body;
    console.log(newReview);
    recipe.reviews.push(newReview);
    await recipe.save();
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Review added successfully",
          recipe
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured deleting review",
          error
        )
      );
  }
};

module.exports = {
  createRecipe,
  getAllRecipe,
  getSingleRecipeById,
  updateSingleRecipe,
  deleteRecipe,
  getAllRecipeByAuthor,
  addReview,
};
