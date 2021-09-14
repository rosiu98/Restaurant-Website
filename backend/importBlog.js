import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import blog from "./data/blog.js";
import User from "./models/userModel.js";
import Blog from "./models/blogModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Blog.deleteMany();

    const id = "6120080a0a97f42dd49aa59b";
    const adminUser = await User.findById(id);

    const sampleBlogs = blog.map((blog) => {
      return { ...blog, user: adminUser };
    });

    await Blog.insertMany(sampleBlogs);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

importData();
