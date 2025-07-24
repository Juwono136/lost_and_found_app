const mongoose = require("mongoose");
const { Schema } = mongoose;

const meetingSchema = new Schema({
  item_id: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  meeting_date: {
    type: Date,
    required: true,
  },
  meeting_time: {
    type: String,
    required: true,
  },
  meeting_location: {
    type: String,
    default: "Pos Security Binus FX Campus",
  },
  meeting_status: {
    type: String,
    enum: ["submitted", "approved", "rejected", "completed", "incomplete"],
    default: "submitted",
  },
}, {
  timestamps: true, // adds createdAt & updatedAt
});

module.exports = mongoose.model("Meeting", meetingSchema);
