const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  item_img: { type: String },
  item_desc: { type: String },
  campus: { type: String, required: true },
  found_at: { type: String, required: true },
  storing_location: { type: String, default: "Pos Security Binus FX Campus" },
  date_reported: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ["waiting for approval", "active", "on hold", "claimed"],
    default: "waiting for approval" 
  },
  PIC: { type: String, required: true },
  founded_by: { type: String },
  claimed_by: { type: String },
  claim_date: { type: Date },
  published_at: { type: Date }
});

module.exports = mongoose.model("Item", itemSchema);
