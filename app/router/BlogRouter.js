const express = require("express");
const router = express.Router();
const blogController = require("../controllers/BlogController");

router.post("/create-blog", blogController.createBlog);
router.get("/blog", blogController.getAllBlog);
router.get("/blog/author/:id", blogController.getAllBlogByAuthor);
router.get("/blog/:id", blogController.getSingleBlogById);
router.put("/blog/:id", blogController.updateSingleBlog);
router.delete("/blog/:id", blogController.deleteBlog);

module.exports = router;
