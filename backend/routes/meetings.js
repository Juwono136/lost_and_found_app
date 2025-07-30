const express = require("express");
const router = express.Router();
const meetingsController = require("../controllers/meetingsController");

//Create a meeting request
router.post("/request", meetingsController.createRequest);

//List all meetings
router.get("/", meetingsController.listMeetings);

//Get meetings for a specific user
router.get("/user/:user_id", meetingsController.getUserMeetings);

//Update meeting details
router.put("/update/:meeting_id", meetingsController.updateMeeting);

//Approve a meeting request
router.put("/approve/:meeting_id", meetingsController.approveMeeting);

//Reject a meeting request
router.put("/reject/:meeting_id", meetingsController.rejectMeeting);

//Delete/cancel a meeting
router.delete("/cancel/:meeting_id", meetingsController.deleteMeeting);

//Mark a meeting completed
router.put("/complete/:meeting_id", meetingsController.completeMeeting);

//Mark a meeting incomplete
router.put("/incomplete/:meeting_id", meetingsController.markMeetingIncomplete);

module.exports = router;
