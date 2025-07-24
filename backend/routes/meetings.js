const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetingsController');

// Create a meeting request
router.post('/request', meetingsController.createRequest);

// List all meetings
router.get('/', meetingsController.listMeetings);

// Get meetings for a specific user
router.get('/user/:userId', meetingsController.getUserMeetings);

// Update meeting details
router.put('/:meetingId', meetingsController.updateMeeting);

// Approve a meeting
router.put('/:meetingId/approve', meetingsController.approveMeeting);

// Reject a meeting
router.put('/:meetingId/reject', meetingsController.rejectMeeting);

// Complete a meeting
router.put('/:meetingId/complete', meetingsController.completeMeeting);

// Mark a meeting as incomplete
router.put('/:meetingId/incomplete', meetingsController.markMeetingIncomplete);

// Delete a meeting
router.delete('/:meetingId', meetingsController.deleteMeeting);

module.exports = router;
