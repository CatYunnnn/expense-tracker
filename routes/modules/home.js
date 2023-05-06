const express = require("express");
const router = express.Router();
const recordList = require("../../models/record");
const CATEGORY = {
  家居物業: "fa-house fa-lg",
  交通出行: "fa-van-shuttle fa-lg",
  休閒娛樂: "fa-face-grin-beam ga-lg",
  餐飲食品: "fa-utensils fa-lg",
  其他: "fa-pen fa-lg",
};
router.get("/", (req, res) => {
  const userid = req.user._id;
  let totalAmount = 0;
  recordList
    .find({ userid })
    .lean()
    .sort({ name: "asc" })
    .then((records) => {
      const processedRecords = records.map((record) => {
        // 依據 categoryid 設定 iconUrl 屬性
        if (record.categoryid === "1") {
          record.iconUrl = CATEGORY.家居物業;
        } else if (record.categoryid === "2") {
          record.iconUrl = CATEGORY.交通出行;
        } else if (record.categoryid === "3") {
          record.iconUrl = CATEGORY.休閒娛樂;
        } else if (record.categoryid === "4") {
          record.iconUrl = CATEGORY.餐飲食品;
        } else if (record.categoryid === "5") {
          record.iconUrl = CATEGORY.其他;
        }
        return record;
      });
      totalAmount = processedRecords.reduce(
        (acc, cur) => acc + Number(cur.amount),
        0
      );
      res.render("index", { records: processedRecords, totalAmount });
    })
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});

router.get("/house", (req, res) => {
  const userid = req.user._id;
  let totalAmount = 0;
  recordList
    .find({ userid, categoryid: "1" })
    .lean()
    .sort({ name: "asc" })
    .then((records) => {
      records = records.map((record) => {
        return {
          ...record,
          iconUrl: CATEGORY.家居物業,
        };
      });
      totalAmount = records.reduce((acc, cur) => acc + Number(cur.amount), 0);
      res.render("index", { records, totalAmount });
    })
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});

router.get("/transportation", (req, res) => {
  const userid = req.user._id;
  let totalAmount = 0;
  recordList
    .find({ userid, categoryid: "2" })
    .lean()
    .sort({ name: "asc" })
    .then((records) => {
      records = records.map((record) => {
        return {
          ...record,
          iconUrl: CATEGORY.交通出行,
        };
      });
      totalAmount = records.reduce((acc, cur) => acc + Number(cur.amount), 0);
      res.render("index", { records, totalAmount });
    })
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});

router.get("/entertainer", (req, res) => {
  const userid = req.user._id;
  let totalAmount = 0;
  recordList
    .find({ userid, categoryid: "3" })
    .lean()
    .sort({ name: "asc" })
    .then((records) => {
      records = records.map((record) => {
        return {
          ...record,
          iconUrl: CATEGORY.休閒娛樂,
        };
      });
      totalAmount = records.reduce((acc, cur) => acc + Number(cur.amount), 0);
      res.render("index", { records, totalAmount });
    })
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});

router.get("/food", (req, res) => {
  const userid = req.user._id;
  let totalAmount = 0;
  recordList
    .find({ userid, categoryid: "4" })
    .lean()
    .sort({ name: "asc" })
    .then((records) => {
      records = records.map((record) => {
        return {
          ...record,
          iconUrl: CATEGORY.餐飲食品,
        };
      });
      totalAmount = records.reduce((acc, cur) => acc + Number(cur.amount), 0);
      res.render("index", { records, totalAmount });
    })
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});

router.get("/others", (req, res) => {
  const userid = req.user._id;
  let totalAmount = 0;
  recordList
    .find({ userid, categoryid: "5" })
    .lean()
    .sort({ name: "asc" })
    .then((records) => {
      records = records.map((record) => {
        return {
          ...record,
          iconUrl: CATEGORY.其他,
        };
      });
      totalAmount = records.reduce((acc, cur) => acc + Number(cur.amount), 0);
      res.render("index", { records, totalAmount });
    })
    .catch((err) => {
      console.log(err);
      res.render("errorPage", { error: err.message });
    });
});
module.exports = router;
