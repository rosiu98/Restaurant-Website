import asyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js";

// @ FETCH ALL BLOGS
// @ GET /api/blogs
// @ Public
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});

  res.json(blogs);
});

export { getAllBlogs };
