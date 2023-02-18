const router = require("express").Router();
const multer = require("multer");
const path = require("path");

router.get("/", async (req, res) => {
  try {
    //display main page in browser!
    await res.render("home.ejs");
  } catch (err) {
    //if there any problem, we'll see message of the problem!
    res.status(500).send("Server error: " + err.message);
  }
});

// _____________________________________________

//Create a storage object that will tell multer where to store the uploaded video file
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    await cb(null, path.join(__dirname, "../public/videos"));
  },
  filename: async function (req, file, cb) {
    await cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024, // limit the file size to 20MB
  },
  fileFilter: async function (req, file, cb) {
    if (!file.mimetype.startsWith("video/")) {
      return await cb(new Error("Only video files are allowed!"));
    }
    cb(null, true);
  },
});
const startUpload = upload.single("video");
router.post("/upload", async function (req, res) {
  await startUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err.message);
      return res.status(500).json({
        msg: err.message,
      });
    } else if (err) {
      console.log(err.message);
      return res.status(500).json({
        msg: err.message,
      });
    }
    let successMsg = "File uploaded";
    res.json({
      msg: successMsg,
    });
    console.log(successMsg);
  });
});

module.exports = router;
