import asyncHandler from "express-async-handler";
import blog from "../data/blog.js";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

// @ FETCH ALL BLOGS
// @ GET /api/blogs
// @ Public
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).populate("user");

  res.json(blogs);
});

export { getAllBlogs };
