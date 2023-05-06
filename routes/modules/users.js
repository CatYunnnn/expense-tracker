const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../../models/user");
////////////////////////////////////登入登出相關
router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/ouo",
    failureFlash: true,
  })
);

router.get("/ouo", (req, res) => {
  req.flash("warning_msg", "帳號或密碼錯誤。");
  res.redirect("/users/new");
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success_msg", "你已經成功登出。");
    res.redirect("/users/login");
  });
});
////////////////////////////////////註冊相關

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const { name, password, confirmPassword } = req.body;
  const errors = [];
  if (!password || !confirmPassword) {
    errors.push({ message: "所有欄位都是必填。" });
  }
  if (password !== confirmPassword) {
    errors.push({ message: "密碼與確認密碼不相符！" });
  }
  if (errors.length) {
    return res.render("register", {
      errors,
      name,
      password,
      confirmPassword,
    });
  }
  User.findOne({ name }).then((user) => {
    if (user) {
      errors.push({ message: "這個使用者已經註冊過了。" });
      return res.render("register", {
        errors,
        name,
        password,
        confirmPassword,
      });
    }
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
      .then((hash) =>
        User.create({
          name,
          password: hash,
        })
      )
      .then(() => res.redirect("/"))
      .catch((err) => console.log(err));
  });
});
module.exports = router;
