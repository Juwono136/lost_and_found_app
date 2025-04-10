const Meeting = require("../models/meeting");
const Item = require("../models/item");
const Notification = require("../models/notification");

// Create a new meeting request (updates item status to "on hold", inserts meeting, sends notification)
exports.createRequest = async (req, res) => {
  try {
    const { item_id, user_id } = req.body;
    // Update item status to "on hold"
    const updatedItem = await Item.findByIdAndUpdate(item_id, { status: "on hold" }, { new: true });
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });

    // Create meeting request
    const newMeeting = new Meeting(req.body);
    const savedMeeting = await newMeeting.save();

    // Create notification for the founder
    const notification = new Notification({
      user_id, 
      item_id,
      meeting_id: savedMeeting._id,
      title: "Claim Submitted",
      message: `Your claim for ${updatedItem.name} has been submitted.`,
      type: "claim_initiated",
      read: false
    });
    await notification.save();

    res.status(201).json(savedMeeting);
  } catch (error) {
    res.status(500).json({ message: "Failed to post meeting", error: error.message });
  }
};

// List all meetings
exports.listMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({}).limit(1000);
    res.json({ meetings });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving meetings", error: error.message });
  }
};

// Get meetings for a specific user
exports.getUserMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ user_id: req.params.user_id });
    if (!meetings.length)
      return res.status(404).json({ message: `No meetings found for user ${req.params.user_id}` });
    res.json({ meetings });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user meetings", error: error.message });
  }
};

// Approve a meeting request
exports.approveMeeting = async (req, res) => {
  try {
    const meeting_id = req.params.meeting_id;
    const updatedMeeting = await Meeting.findByIdAndUpdate(meeting_id, { status: "approved" }, { new: true });
    if (!updatedMeeting)
      return res.status(404).json({ message: "Meeting not found" });
    
    // Retrieve the associated item for notification
    const item = await Item.findById(updatedMeeting.item_id);
    if (!item)
      return res.status(404).json({ message: "Item not found" });
    
    // Send notification to the user
    const notification = new Notification({
      user_id: updatedMeeting.user_id,
      item_id: updatedMeeting.item_id,
      meeting_id: updatedMeeting._id,
      title: "Meeting Approved",
      message: `Your meeting for ${item.name} has been approved. Please be on time.`,
      type: "meeting_approved",
      read: false
    });
    await notification.save();
    
    res.json(updatedMeeting);
  } catch (error) {
    res.status(500).json({ message: "Error approving meeting", error: error.message });
  }
};

// Reject a meeting request (update status to "rejected", send notification)
exports.rejectMeeting = async (req, res) => {
  try {
    const meeting_id = req.params.meeting_id;
    const meeting = await Meeting.findById(meeting_id);
    if (!meeting)
      return res.status(404).json({ message: "Meeting not found" });
    
    meeting.status = "rejected";
    await meeting.save();

    await Item.findByIdAndUpdate(meeting.item_id, { status: "active" });

    const item = await Item.findById(meeting.item_id);
    if (!item)
      return res.status(404).json({ message: "Item not found" });

    const notification = new Notification({
      user_id: meeting.user_id,
      item_id: meeting.item_id,
      meeting_id: meeting._id,
      title: "Meeting Rejected",
      message: `Your claim for ${item.name} has been rejected.`,
      type: "meeting_rejected",
      read: false
    });
    await notification.save();

    res.json(meeting);
  } catch (error) {
    res.status(500).json({ message: "Error rejecting meeting", error: error.message });
  }
};

// Delete a meeting
exports.deleteMeeting = async (req, res) => {
  try {
    const result = await Meeting.deleteOne({ _id: req.params.meeting_id });
    if (result.deletedCount)
      res.json({ message: "Meeting successfully deleted" });
    else res.status(404).json({ message: "Meeting not found" });
  } catch (error) {
    res.status(500).json({ message: "Error cancelling meeting", error: error.message });
  }
};

// Mark meeting as complete (update status to "completed", send notification)
exports.completeMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.meeting_id);
    if (!meeting)
      return res.status(404).json({ message: "Meeting not found" });
    
    meeting.status = "completed";
    await meeting.save();

    const notification = new Notification({
      user_id: meeting.user_id,
      item_id: meeting.item_id,
      meeting_id: meeting._id,
      title: "Meeting Completed",
      message: "Please verify that you've claimed and received this item.",
      type: "meeting_completed",
      read: false
    });
    await notification.save();

    res.json({ message: "Meeting completed successfully", meeting });
  } catch (error) {
    res.status(500).json({ message: "Error completing meeting", error: error.message });
  }
};

// Mark meeting as incomplete (update status to "incomplete", send notification)
exports.markMeetingIncomplete = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.meeting_id);
    if (!meeting)
      return res.status(404).json({ message: "Meeting not found" });
    
    meeting.status = "incomplete";
    await meeting.save();

    const notification = new Notification({
      user_id: meeting.user_id,
      item_id: meeting.item_id,
      meeting_id: meeting._id,
      title: "Meeting Marked Incomplete",
      message: "Your meeting has been marked as incomplete. Please check the details.",
      type: "meeting_incomplete",
      read: false
    });
    await notification.save();
    
    res.json(meeting);
  } catch (error) {
    res.status(500).json({ message: "Error marking meeting incomplete", error: error.message });
  }
};
