const Meeting = require('../models/meeting');
const Item = require('../models/item');
const Notification = require('../models/notification');

// Create a meeting request
exports.createRequest = async (req, res, next) => {
  try {
    const { item_id, user_id, meeting_date, meeting_time, meeting_location } = req.body;

    // put item on hold
    const updatedItem = await Item.findByIdAndUpdate(
      item_id,
      { status: 'on hold' },
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: 'Item not found' });

    // create meeting
    const meeting = new Meeting({
      item_id,
      user_id,
      meeting_date: new Date(meeting_date),
      meeting_time,
      meeting_location: meeting_location || updatedItem.storing_location,
      status: 'submitted'
    });
    const savedMeeting = await meeting.save();

    // notify user
    const notif = new Notification({
      user_id,
      item_id,
      meeting_id: savedMeeting._id,
      title: 'Claim Submitted',
      message: `Your claim for ${updatedItem.name} has been submitted.`,
      type: 'claim_initiated',
      read: false
    });
    await notif.save();

    res.status(201).json(savedMeeting);
  } catch (err) {
    next(err);
  }
};

// List all meetings
exports.listMeetings = async (req, res, next) => {
  try {
    const meetings = await Meeting.find().sort({ createdAt: -1 }).lean();
    res.json(meetings);
  } catch (err) {
    next(err);
  }
};

// Get a single meeting by ID
exports.getUserMeetings = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const meetings = await Meeting.find({ user_id }).sort({ createdAt: -1 }).lean();
    if (meetings.length === 0) {
      return res.status(404).json({ message: `No meetings found for user ${user_id}` });
    }
    res.json(meetings);
  } catch (err) {
    next(err);
  }
};

// Update meeting details
exports.updateMeeting = async (req, res, next) => {
  try {
    const { meeting_id } = req.params;
    const updateData = {};
    if (req.body.meeting_date)  updateData.meeting_date = new Date(req.body.meeting_date);
    if (req.body.meeting_time)  updateData.meeting_time = req.body.meeting_time;
    if (req.body.meeting_location) updateData.meeting_location = req.body.meeting_location;

    const updated = await Meeting.findByIdAndUpdate(meeting_id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: 'Meeting not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Approve a meeting
exports.approveMeeting = async (req, res, next) => {
  try {
    const { meeting_id } = req.params;
    const updatedMeeting = await Meeting.findByIdAndUpdate(
      meeting_id,
      { status: 'approved' },
      { new: true }
    );
    if (!updatedMeeting) return res.status(404).json({ message: 'Meeting not found' });

    // notify user
    const item = await Item.findById(updatedMeeting.item_id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const notif = new Notification({
      user_id: updatedMeeting.user_id,
      item_id: updatedMeeting.item_id,
      meeting_id: updatedMeeting._id,
      title: 'Meeting Approved',
      message: `Your meeting for ${item.name} has been approved. Please be on time.`,
      type: 'meeting_approved',
      read: false
    });
    await notif.save();

    res.json(updatedMeeting);
  } catch (err) {
    next(err);
  }
};

// Reject a meeting
exports.rejectMeeting = async (req, res, next) => {
  try {
    const { meeting_id } = req.params;
    const meeting = await Meeting.findById(meeting_id);
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

    meeting.status = 'rejected';
    await meeting.save();

    await Item.findByIdAndUpdate(meeting.item_id, { status: 'active' });
    const item = await Item.findById(meeting.item_id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const notif = new Notification({
      user_id: meeting.user_id,
      item_id: meeting.item_id,
      meeting_id: meeting._id,
      title: 'Meeting Rejected',
      message: `Your claim for ${item.name} has been rejected.`,
      type: 'meeting_rejected',
      read: false
    });
    await notif.save();

    res.json(meeting);
  } catch (err) {
    next(err);
  }
};

// Mark a meeting as completed
exports.completeMeeting = async (req, res, next) => {
  try {
    const { meeting_id } = req.params;
    const meeting = await Meeting.findById(meeting_id);
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

    meeting.status = 'completed';
    await meeting.save();

    const notif = new Notification({
      user_id: meeting.user_id,
      item_id: meeting.item_id,
      meeting_id: meeting._id,
      title: 'Meeting Completed',
      message: "Please verify that you've claimed and received this item.",
      type: 'meeting_completed',
      read: false
    });
    await notif.save();

    res.json({ message: 'Meeting completed successfully', meeting });
  } catch (err) {
    next(err);
  }
};

//mark a meeting as incomplete
exports.markMeetingIncomplete = async (req, res, next) => {
  try {
    const { meeting_id } = req.params;
    const meeting = await Meeting.findById(meeting_id);
    if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

    meeting.status = 'incomplete';
    await meeting.save();

    const notif = new Notification({
      user_id: meeting.user_id,
      item_id: meeting.item_id,
      meeting_id: meeting._id,
      title: 'Meeting Marked Incomplete',
      message: 'Your meeting has been marked as incomplete. Please check the details.',
      type: 'meeting_incomplete',
      read: false
    });
    await notif.save();

    res.json(meeting);
  } catch (err) {
    next(err);
  }
};

//delete a meeting
exports.deleteMeeting = async (req, res, next) => {
  try {
    const { meeting_id } = req.params;
    const result = await Meeting.findByIdAndDelete(meeting_id);
    if (!result) return res.status(404).json({ message: 'Meeting not found' });
    res.json({ message: 'Meeting successfully deleted' });
  } catch (err) {
    next(err);
  }
};
