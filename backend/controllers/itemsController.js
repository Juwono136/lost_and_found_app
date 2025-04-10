const Item = require("../models/item");
const { default: mongoose } = require("mongoose");

// List all items (limit to 1000)
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({}).limit(1000);
    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Create a new item
exports.createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const saved = await newItem.save();

    res.status(201).json({ message: "Item posted successfully", item: saved });
  } catch (error) {
    res.status(500).json({ message: "Failed to post item", error: error.message });
  }
};

// Get an item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (item) res.json(item);
    else res.status(404).json({ message: "Item not found" });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving item", error: error.message });
  }
};

// Delete an item by ID
exports.deleteItem = async (req, res) => {
  try {
    const result = await Item.deleteOne({ _id: req.params.id });
    if (result.deletedCount) res.json({ message: "Item deleted successfully" });
    else res.status(404).json({ message: "Item not found" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error: error.message });
  }
};

// Claim an item (update status, claimed_by, claim_date)
exports.claimItem = async (req, res) => {
  try {
    const { claimed_by } = req.body;
    const update = {
      status: "claimed",
      claimed_by,
      claim_date: new Date().toISOString()
    };
    const updated = await Item.findByIdAndUpdate(req.params.item_id, update, { new: true });
    if (updated) res.json(updated);
    else res.status(404).json({ message: "Item not found" });
  } catch (error) {
    res.status(500).json({ message: "Error claiming item", error: error.message });
  }
};

// Update item details (general update)
exports.updateItem = async (req, res) => {
  try {
  
    const updateData = req.body;
    const updated = await Item.findByIdAndUpdate(req.params.item_id, updateData, { new: true });
    if (updated) res.json(updated);
    else res.status(404).json({ message: "Item not found" });
  } catch (error) {
    res.status(500).json({ message: "Error updating item", error: error.message });
  }
};

// Approve an item 
exports.approveItem = async (req, res) => {
  try {
    const update = {
      status: "active",
      published_at: new Date().toISOString()
    };
    const updated = await Item.findByIdAndUpdate(req.params.item_id, update, { new: true });
    if (updated) res.json({ message: "Item approved successfully", item: updated });
    else res.status(404).json({ message: "Item not found" });
  } catch (error) {
    res.status(500).json({ message: "Error approving item", error: error.message });
  }
};
