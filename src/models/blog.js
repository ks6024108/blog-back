// models/Blog.js
// const mongoose = require("mongoose");
import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      // trim: true,
    },
    description: {
      type: String,
      // required: true,
    },
    banner: {
      type: String, // URL to the banner image on Cloudinary
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      // required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      // required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
