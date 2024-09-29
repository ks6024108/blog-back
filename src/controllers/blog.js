import cloudinary from "../config/cloudinary.js";
import { Blog, Category } from "../models/index.js";

const addBlog = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { title, description, category } = req.body;

    const isCategoryExist = await Category.findById(category);
    if (!isCategoryExist) {
      res.code = 400;
      throw new Error("category not found");
    }

    if (!req.file) {
      res.code = 400;
      throw new Error("image is required");
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "blog_banners",
    });

    const newBlog = new Blog({
      title,
      description,
      banner: result.secure_url, // Store Cloudinary URL
      category,
      updatedBy: _id,
    });

    await newBlog.save();
    console.log("newBlog:", newBlog);
    res.status(201).json({
      code: 201,
      status: true,
      message: "blog posted successfully",
      data: newBlog,
    });
  } catch (error) {
    next(error);
  }
};

const updateBlog = async (req, res, next) => {
  try {
    const { title, description, category } = req.body;
    const { id } = req.params;
    const blog = await Blog.findById(id);

    const isCategoryExist = await Category.findById(category);
    if (!isCategoryExist) {
      res.code = 400;
      throw new Error("Category not found");
    }

    if (!blog) {
      res.code = 404;
      throw new Error("Blog not found");
    }
    const { _id } = req.user;

    if (!req.file) {
      res.code = 404;
      throw new Error("please give new image");
    }

    if (req.file) {
      // Delete the existing image on Cloudinary
      const publicId = blog.banner.split("/").pop().split(".")[0]; // Extract public_id from the URL
      await cloudinary.uploader.destroy(`blog_banners/${publicId}`);

      // Upload the new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_banners",
      });

      blog.banner = result.secure_url;
    }

    blog.title = title ? title : blog.title;
    blog.description = description ? description : blog.description;
    blog.category = category ? category : blog.category;
    blog.updatedBy = _id;

    await blog.save();
    res.status(200).json({
      code: 200,
      status: true,
      message: "update blog successfully",
      data: { blog },
    });
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      res.code = 404;
      throw new Error("Blog not found");
    }

    //delete image also for cloudinary
    if (blog.banner) {
      const publicId = blog.banner.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`blog_banners/${publicId}`);
    }

    await Blog.findByIdAndDelete(id);
    res.status(200).json({
      code: 200,
      status: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllBlogs = async (req, res, next) => {
  try {
    const { size, page, category, q } = req.query;
    let query = {};

    const sizeNumber = parseInt(size) || 10;
    const pageNumber = parseInt(page) || 1;

    if (q) {
      const search = RegExp(q, "i");
      query = { $or: [{ title: search }] };
    }

    if (category) {
      query = { ...query, category };
    }
    const total = await Blog.countDocuments(query);
    const pages = Math.ceil(total / sizeNumber);

    const blogs = await Blog.find(query)
      .populate("category")
      .populate("updatedBy", "-password -verificationCode -forgotPasswordCode")
      .skip((pageNumber - 1) * sizeNumber)
      .limit(sizeNumber)
      .sort({ updatedBy: -1 });

    res.status(200).json({
      code: 200,
      status: true,
      message: "get blogs list successfully",
      data: { blogs, total, pages },
    });
  } catch (error) {
    next(error);
  }
};

const getBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id)
      .populate("category")
      .populate("updatedBy", "-password -verificationCode -forgotPasswordCode");

    if (!blog) {
      res.code = 404;
      throw new Error("Blog not found");
    }
    res.status(200).json({
      code: 200,
      status: true,
      message: "Get blog successfully",
      data: { blog },
    });
  } catch (error) {
    next(error);
  }
};

export default { addBlog, updateBlog, deleteBlog, getAllBlogs, getBlog };
