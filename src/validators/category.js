import { check, param } from "express-validator";
import mongoose from "mongoose";

const addCategoryValidator = [
  check("title").notEmpty().withMessage("Title is required"),
];

const idValidator = [
  param("id").custom(async (id) => {
    if (id && !mongoose.Types.ObjectId.isValid(id)) {
      throw "invalid category id";
    }
  }),
];

export { addCategoryValidator, idValidator };
