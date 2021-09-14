import express from "express";
const router = express.Router();
import { getAllBlogs, getBlogById } from "../controllers/blogController.js";

router.route("/").get(getAllBlogs);
router.route("/:id").get(getBlogById);

export default router;
