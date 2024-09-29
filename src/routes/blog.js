import express from "express";
import validate from "../validators/validate.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

import upload from "../middlewares/multer.js";
// import cloudinary from "../config/cloudinary.js";
// import { Blog } from "../models/index.js";
import { blogController } from "../controllers/index.js";
import {
  addBlogValidator,
  idValidator,
  updateBlogValidator,
} from "../validators/blog.js";

const router = express.Router();

router.post(
  "/create",
  upload.single("banner"),
  isAuth,
  isAdmin,
  addBlogValidator,
  validate,
  blogController.addBlog
);

router.put(
  "/update/:id",
  upload.single("banner"),
  isAuth,
  isAdmin,
  updateBlogValidator,
  idValidator,
  validate,
  blogController.updateBlog
);

router.delete(
  "/delete/:id",
  isAuth,
  isAdmin,
  idValidator,
  validate,
  blogController.deleteBlog
);

router.get("/", blogController.getAllBlogs);

router.get("/:id", idValidator, validate, blogController.getBlog);

export default router;
