const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Format d'image non compatible", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}-groupomania-${file.originalname}`);
  },
});

const uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;
