const path = require("path");
//const morgan = require("morgan");
const express = require("express");
const exphbs = require("express-handlebars");
const fileUpload = require("express-fileupload");

// Initialize
const app = express();

// Configs
app.set("PORT", 3000);
app.set("views", path.join(__dirname, "src/views"));

// Engine
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: "src/views/layouts",
    partialsDir: "src/views/partials",
  })
);
app.set("view engine", ".hbs");

// Middlewares
app.use(fileUpload());
//app.use(morgan("dev"));

// Routes
app.use(require("./src/routes/index"));

// Public
app.use(express.static(__dirname + "/public"));

// Start
app.listen(app.get("PORT"), () => {
  console.log(`server running on port ${app.get("PORT")}`);
});
