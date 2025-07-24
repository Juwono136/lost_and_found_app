const Item = require('../models/item');

// Create a new item
exports.createItem = async (req, res, next) => {
  try {
    const payload = {
      user_id: req.body.user_id,
      staff_id: req.body.staff_id,
      name: req.body.name,
      item_img: req.body.item_img,
      item_desc: req.body.item_desc,
      category: req.body.category,
      found_at: req.body.found_at,
      storing_location: req.body.storing_location,
      draft: req.body.draft || false,
      status: req.body.status || 'waiting for approval',
      claimed_by: req.body.claimed_by,
      claim_date: req.body.claim_date,
      published_at: req.body.published_at,
    };

    const newItem = new Item(payload);
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// List all items
exports.listItems = async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch (err) {
    next(err);
  }
};

// Get a single item by ID
exports.getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id).lean();
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

// Update an item’s details
exports.updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    const updated = await Item.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: 'Item not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Delete an item
exports.deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Item.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    next(err);
  }
};

// Claim an item
exports.claimItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id: claimed_by } = req.body;
    const update = {
      status: 'claimed',
      claimed_by,
      claim_date: new Date(),
    };
    const claimed = await Item.findByIdAndUpdate(id, update, { new: true });
    if (!claimed) return res.status(404).json({ message: 'Item not found' });
    res.json(claimed);
  } catch (err) {
    next(err);
  }
};

// Approve an item (set active + published_at)
exports.approveItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = {
      status: 'active',
      published_at: new Date(),
    };
    const approved = await Item.findByIdAndUpdate(id, update, { new: true });
    if (!approved) return res.status(404).json({ message: 'Item not found' });
    res.json(approved);
  } catch (err) {
    next(err);
  }
};