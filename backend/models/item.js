const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  user_id: {
    type: String,
    required: true,
  },
  staff_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  item_img: {
    type: String,
  },
  item_desc: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  found_at: {
    type: String,
    required: true,
  },
  storing_location: {
    type: String,
    default: "Pos Security Binus FX Campus",
  },
  date_reported: {
    type: Date,
    default: Date.now,
  },
  draft: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["waiting for approval", "active", "on hold", "claimed"],
    default: "waiting for approval",
  },
  claimed_by: {
    type: String,
  },
  claim_date: {
    type: Date,
  },
  published_at: {
    type: Date,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Item", itemSchema);
