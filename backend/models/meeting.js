const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  item_id: { type: String, required: true },
  meeting_date: { type: Date, required: true },
  location: { type: String, default: "Pos Security Binus FX Campus" },
  status: { 
    type: String, 
    enum: ["submitted", "approved", "rejected", "completed", "incomplete"],
    default: "submitted" 
  }
});

module.exports = mongoose.model("Meeting", meetingSchema);
