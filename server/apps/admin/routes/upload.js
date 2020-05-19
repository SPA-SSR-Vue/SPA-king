module.exports = app => {
  const multer = require("multer");
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + "/../../../public/uploads");
    },
    filename: function (req, file, cb) {
      const originalName = file.originalname.split(".").shift();
      const suffix = file.originalname.split(".").pop();
      cb(null, file.fieldname + originalName + Date.now() + "." + suffix);
    },
  });

  const upload = multer({ storage });

  app.use("/admin/api/uploads", upload.single("file"), (req, res, next) => {
    res.send({
      url: `http://localhost:3000/uploads/${req.file.filename}`,
    });
  });
};
