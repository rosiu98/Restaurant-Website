import asyncHandler from "express-async-handler";
import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";

// @ FETCH ALL BLOGS
// @ GET /api/blogs
// @ Public
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});

  res.json(blogs);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("user");

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Delete a blog
// @route DELETE /api/blogs/:id
// @access Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc Create a blog
// @route POST /api/blogs
// @access Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const blog = new Blog({
    title: "Sample title",
    user: req.user._id,
    image: "/images/sample.jpg",
    category: "KEBAB",
    numReviews: 0,
    description: "Sample description",
  });

  const createdBlog = await blog.save();

  res.status(201).json(createdBlog);
});

// @desc Update a blog
// @route PUT /api/blogs/:id
// @access Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const { title, image, category, description } = req.body;

  const blog = await Blog.findByIdAndUpdate(req.params.id);

  if (blog) {
    blog.title = title;
    blog.image = image;
    blog.category = category;
    blog.description = description;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  }
});

export { getAllBlogs, getBlogById, deleteBlog, createBlog, updateBlog };
