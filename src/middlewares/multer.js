// multer.js
// const multer = require("multer");
// const path = require("path");

import multer from "multer";
import path from "path";

// Set up multer storage
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// module.exports = upload;
export default upload;
