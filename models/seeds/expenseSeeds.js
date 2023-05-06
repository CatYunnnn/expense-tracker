const mongoose = require("mongoose");
const recordList = require("../record");
const userList = require("../user");
const bcrypt = require("bcryptjs");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
const userseeds = [
  {
    name: "mother",
    password: "000000",
  },
];
const recordseeds = [
  {
    id: "1",
    spentFor: "午餐",
    date: "2023/05/06",
    amount: "180",
    categoryid: "4",
  },
  {
    id: "2",
    spentFor: "晚餐",
    date: "2023/05/06",
    amount: "150",
    categoryid: "4",
  },
  {
    id: "3",
    spentFor: "捷運",
    date: "2023/05/06",
    amount: "60",
    categoryid: "2",
  },
  {
    id: "4",
    spentFor: "電影:驚奇隊長",
    date: "2023/05/06",
    amount: "280",
    categoryid: "3",
  },
  {
    id: "5",
    spentFor: "租金",
    date: "2023/06/10",
    amount: "8000",
    categoryid: "1",
  },
];
db.once("open", async () => {
  console.log("mongodb connected!");
  const promises = [];
  for (let i = 0; i < userseeds.length; i++) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(userseeds[i].password, salt);
    const user = await userList.create({
      name: userseeds[i].name,
      password: hash,
    });
    const userid = user._id;
    // create restaurants for first user
    for (let i = 0; i < recordseeds.length; i++) {
      promises.push(
        recordList.create({
          ...recordseeds[i],
          userid: userid,
        })
      );
    }
  }
  try {
    await Promise.all(promises);
    console.log("done.");
    process.exit();
  } catch (error) {
    console.error(error);
  }
});
