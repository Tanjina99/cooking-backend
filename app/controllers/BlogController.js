const status = require("http-status");
const response = require("../utils/response");
const { Blog } = require("../models/BlogModel");

//create a Blog
const createBlog = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    const result = await newBlog.save();
    res
      .status(status.status.CREATED)
      .send(
        response.createSuccessResponse(
          status.status.CREATED,
          "New blog created Successfully!",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.INTERNAL_SERVER_ERROR,
          "Error creating new blog",
          error
        )
      );
  }
};

//get all blog
const getAllBlog = async (req, res) => {
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

    const result = await Blog.find(query).populate("author");
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "All blog data retrieve successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.INTERNAL_SERVER_ERROR,
          "Error retrieving all blog",
          error
        )
      );
  }
};

//get the blogby author
const getAllBlogByAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const result = await Blog.find({ author: id }).populate(
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

//get blog by single Id
const getSingleBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Blog.findById(id)
      .populate("author")
      .populate("comments.commenterId", "fullName photo");

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "Blog by Id is not found"
          )
        );
    }
    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "blog byId data retrieve successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error retrieving all blogs",
          error
        )
      );
  }
};

//update blog
const updateSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const result = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "Blog by Id is not found"
          )
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Blog byId updated successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error updating blog by single Id",
          error
        )
      );
  }
};

//delete blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Blog.findByIdAndDelete(id, { new: true });

    if (!result) {
      return res
        .status(status.status.NOT_FOUND)
        .send(
          response.createErrorResponse(
            status.status.NOT_FOUND,
            "Blog by Id is not found"
          )
        );
    }

    res
      .status(status.status.OK)
      .send(
        response.createSuccessResponse(
          status.status.OK,
          "Blog deleted successfully",
          result
        )
      );
  } catch (error) {
    res
      .status(status.status.INTERNAL_SERVER_ERROR)
      .send(
        response.createErrorResponse(
          status.status.INTERNAL_SERVER_ERROR,
          "Error occured deleting Blog",
          error
        )
      );
  }
};

module.exports = {
  createBlog,
  getAllBlog,
  getSingleBlogById,
  updateSingleBlog,
  deleteBlog,
  getAllBlogByAuthor,
};
