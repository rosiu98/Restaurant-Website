import express from "express";
const router = express.Router();
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
} from "../controllers/blogController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getAllBlogs).post(protect, admin, createBlog);
router
  .route("/:id")
  .get(getBlogById)
  .delete(protect, admin, deleteBlog)
  .put(protect, admin, updateBlog);

export default router;
