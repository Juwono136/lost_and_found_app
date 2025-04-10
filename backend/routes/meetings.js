// routes/meetings.js
const express = require("express");
const router = express.Router();
const meetingsController = require("../controllers/meetingsController");

// Create a meeting request (POST /meetings/request)
router.post("/request", meetingsController.createRequest);

// List all meetings (GET /meetings)
router.get("/", meetingsController.listMeetings);

// Get meetings for a user (GET /meetings/meetings/:user_id)
router.get("/meetings/:user_id", meetingsController.getUserMeetings);

// Approve meeting (PUT /meetings/approve/:meeting_id)
router.put("/approve/:meeting_id", meetingsController.approveMeeting);

// Reject meeting (PUT /meetings/reject/:meeting_id)
router.put("/reject/:meeting_id", meetingsController.rejectMeeting);

// Cancel (delete) a meeting (DELETE /meetings/cancel/:meeting_id)
router.delete("/cancel/:meeting_id", meetingsController.deleteMeeting);

// Complete a meeting (PUT /meetings/complete/:meeting_id)
router.put("/complete/:meeting_id", meetingsController.completeMeeting);

// Mark meeting as incomplete (PUT /meetings/incomplete/:meeting_id)
router.put("/incomplete/:meeting_id", meetingsController.markMeetingIncomplete);

module.exports = router;
