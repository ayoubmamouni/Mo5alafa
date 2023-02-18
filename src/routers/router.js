const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    //display main page in browser!
    await res.render("home.ejs");
  } catch (err) {
    //if there any problem, we'll see message of the problem!
    res.status(500).send("Server error: " + err.message);
  }
});

module.exports = router;
