const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  item_id: { type: String, required: true },
  meeting_id: { type: String },
  title: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  type: { 
    type: String, 
    enum: [
      "claim_initiated",
      "claim_under_review",
      "meeting_approved",
      "meeting_rejected",
      "meeting_incomplete",
      "item_claimed",
      "verification_request",
      "meeting_completed"
    ],
    required: true 
  },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Notification", notificationSchema);
