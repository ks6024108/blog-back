import { check, param } from "express-validator";
import mongoose from "mongoose";

const addBlogValidator = [
  check("title").notEmpty().withMessage("Title is required"),
  check("description").notEmpty().withMessage("Description is required"),

  check("category")
    .notEmpty()
    .withMessage("Category is required")
    .custom(async (category) => {
      if (category && !mongoose.Types.ObjectId.isValid(category)) {
        throw "invalid category id";
      }
    }),
];

const updateBlogValidator = [
  // check("title").notEmpty().withMessage("Title is required"),
  // check("description").notEmpty().withMessage("Description is required"),

  check("category").custom(async (category) => {
    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      throw "invalid category id";
    }
  }),
];

const idValidator = [
  param("id").custom(async (id) => {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw "invalid post id";
    }
  }),
];

export { addBlogValidator, updateBlogValidator,idValidator };
