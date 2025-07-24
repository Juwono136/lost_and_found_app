// backend/models/notification.js

const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  item_id: {
    type: Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  meeting_id: {
    type: Schema.Types.ObjectId,
    ref: "Meeting",
  },
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
      "meeting_completed",
    ],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // adds createdAt & updatedAt
});

module.exports = mongoose.model("Notification", notificationSchema);
