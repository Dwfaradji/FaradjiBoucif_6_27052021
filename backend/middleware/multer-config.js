import multerFile  from "multer";

const mineTypes = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multerFile.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = mineTypes[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

const multer = multerFile({ storage: storage }).single("image");

export { multer };
