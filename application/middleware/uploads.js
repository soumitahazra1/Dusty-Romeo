const multer = require("multer");

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "app/public/assets/uploads");
    },
    filename: (req, file, cb) => {
        let name = `${Date.now()}-profile_-${file.originalname}`
        req.body.profile_image = name
        cb(null, name);
    },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;