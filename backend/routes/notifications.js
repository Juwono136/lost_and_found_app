// routes/notifications.js
const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/notificationsController");

// Fetch notifications by user (GET /notifications/read/:user_id)
router.get("/read/:user_id", notificationsController.fetchNotificationsByUser);

// Fetch all notifications (GET /notifications/read-all)
router.get("/read-all", notificationsController.fetchAllNotifications);

// Change notification status to read (PUT /notifications/change_status/:notif_id)
router.put("/change_status/:notif_id", notificationsController.changeStatus);

module.exports = router;
