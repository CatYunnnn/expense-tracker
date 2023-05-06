const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const exphbs = require("express-handlebars");
const routes = require("./routes");
const app = express();
const db = require("./config/mongoose");
const usePassport = require("./config/passport");
const session = require("express-session");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
app.engine("hbs", exphbs.engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
usePassport(app);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg"); // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash("warning_msg"); // 設定 warning_msg 訊息
  next();
});
app.use(routes);
app.listen(port, () => {
  console.log("running~");
});
