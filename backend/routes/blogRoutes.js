import express from "express";
const router = express.Router();
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  newestBlogs,
  updateBlog,
} from "../controllers/blogController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").get(getAllBlogs).post(protect, admin, createBlog);
router.get("/top", newestBlogs);
router
  .route("/:id")
  .get(getBlogById)
  .delete(protect, admin, deleteBlog)
  .put(protect, admin, updateBlog);

export default router;
