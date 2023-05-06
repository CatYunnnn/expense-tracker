const express = require("express");
const router = express.Router();
const recordList = require("../../models/record");

//////////////////////////////////////新增相關

router.get("/new", (req, res) => {
  return res.render("new");
});

router.post("/new", (req, res) => {
  let userid = req.user._id;
  recordList
    .create({
      ...req.body,
      userid,
    })
    .then(() => {
      res.redirect("/");
    });
});

//////////////////////////////////////修改相關

router.get("/:_id/edit", (req, res) => {
  recordList
    .findOne({ _id: req.params._id })
    .lean()
    .then((recordinfo) => {
      res.render("edit", {
        recordinfo,
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});

router.put("/:_id", (req, res) => {
  const { id, spentFor, date, amount, categoryid } = req.body;
  recordList
    .findOne({ _id: req.params._id })
    .then((recordinfo) => {
      recordinfo.id = id;
      recordinfo.spentFor = spentFor;
      recordinfo.date = date;
      recordinfo.amount = amount;
      recordinfo.categoryid = categoryid;
      recordinfo.save();
    })
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});

/////////////////////////////////////////////刪除相關

router.delete("/:_id", (req, res) => {
  recordList
    .deleteOne({ _id: req.params._id })
    .then(() => res.redirect("/"))
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});
module.exports = router;
