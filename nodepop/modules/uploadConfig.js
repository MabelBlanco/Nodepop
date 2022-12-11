const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "public/images/advertisements"),
  filename: (req, file, callback) => {
    const filename =
      file.fieldname + "-" + Date.now() + "-" + file.originalname;

    callback(null, filename);
  },
});

module.exports = multer({ storage });
