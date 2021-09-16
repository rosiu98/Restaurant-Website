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
    await blog.remove();
    res.json({ message: "Blog removed" });
  } else {
    res.status(404);
    throw new Error("Blog not found");
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

// @desc Newest Blogs
// @route GET /api/blogs
// @access Public
const newestBlogs = asyncHandler(async (req, res) => {
  const newest = await Blog.find({}).sort({ createdAt: -1 }).limit(3);

  res.json(newest);
});

// @desc Create Review for Blog
// @route POST /api/blogs/:id/comments
// @access Private
const createCommentBlog = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    const blogCommentExist = blog.comments.find(
      (r) => r.user.toString() === req.body._id.toString()
    );

    if (blogCommentExist) {
      res.status(400);
      throw new Error("Product already review");
    }

    const review = {
      name: req.user.name,
      comment,
      user: req.user._id,
    };

    blog.comments.push(review);

    await blog.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

export {
  getAllBlogs,
  getBlogById,
  deleteBlog,
  createBlog,
  updateBlog,
  newestBlogs,
  createCommentBlog,
};
