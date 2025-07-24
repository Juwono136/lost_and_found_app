// controllers/notificationsController.js

const Notification = require('../models/notification');

// Create a new notification
exports.createNotification = async (req, res, next) => {
  try {
    const payload = {
      user_id:    req.body.user_id,
      item_id:    req.body.item_id,
      meeting_id: req.body.meeting_id,
      type:       req.body.type,
      title:      req.body.title,
      message:    req.body.message,
      read:       req.body.read || false,
    };

    const notif = new Notification(payload);
    const saved = await notif.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// Fetch notifications by user
exports.fetchNotificationsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const notifs = await Notification.find({ user_id: userId })
      .sort({ createdAt: -1 })
      .lean();
    if (!notifs.length) {
      return res.status(404).json({ message: 'No notifications found' });
    }
    res.json(notifs);
  } catch (err) {
    next(err);
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json({ message: 'Notification marked as read', notification: updated });
  } catch (err) {
    next(err);
  }
};
