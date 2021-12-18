import multerFile from "multer";

const mineTypes = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multerFile.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (res, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = mineTypes[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
    //===== contrôle extension images
    if (!extension) {
      return res.status(400).json({error:"error"});
    }
  },
});

const multer = multerFile({ storage: storage }).single("image");

export { multer };
