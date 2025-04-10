const Notification = require("../models/notification");

// Fetch notifications by user (sorted by created_at descending)
exports.fetchNotificationsByUser = async (req, res) => {
  try {
    const notifications = await Notification.find({ user_id: req.params.user_id }).sort({ created_at: -1 }).limit(100);
    if (notifications.length)
      res.json(notifications);
    else res.status(404).json({ message: "No notifications found for this user" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error: error.message });
  }
};

// Fetch all notifications (sorted by created_at descending)
exports.fetchAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({}).sort({ created_at: -1 }).limit(100);
    if (notifications.length)
      res.json(notifications);
    else res.status(404).json({ message: "No notifications found" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error: error.message });
  }
};

// Update a notification's status to read
exports.changeStatus = async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(req.params.notif_id, { read: true }, { new: true });
    if (updated)
      res.json({ message: "Notification status updated" });
    else res.status(404).json({ message: "Notification not found" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update notification status", error: error.message });
  }
};
