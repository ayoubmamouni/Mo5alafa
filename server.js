const express = require("express");
const app = express();

if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

app.set("view engine", "ejs");
app.set("views", __dirname + "/src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/src/public"));

app.use("/", require("./src/routers/router"));

// 404 request handler
app.use((req, res, next) => {
  res.status(404).send("<h1>Page note found!!</h1>");
  //   res.status(404).render("not-found.ejs");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running at ${PORT}`));
