const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recordListSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  spentFor: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  categoryid: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("recordList", recordListSchema);
