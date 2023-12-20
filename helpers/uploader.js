const fs = require("fs");
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000, 
  },
}).single("image");

module.exports = upload;
