const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');

// Create a new notification
router.post('/', notificationsController.createNotification);

// Fetch notifications for a user
router.get('/user/:userId', notificationsController.fetchNotificationsByUser);

// Mark a notification as read
router.put('/:id/read', notificationsController.markAsRead);

module.exports = router;
