import asyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

// @ FETCH ALL BLOGS
// @ GET /api/blogs
// @ Public
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).populate("user");

  res.json(blogs);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export { getAllBlogs, getBlogById };
