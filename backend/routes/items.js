const express = require("express");
const router = express.Router();
const itemsController = require("../controllers/itemsController");

// Create new item (POST /items/new)
router.post("/new", itemsController.createItem);

// List all items (GET /items)
router.get("/", itemsController.getItems);

// Get item by ID (GET /items/:id)
router.get("/:id", itemsController.getItemById);

// Delete an item (DELETE /items/delete/:id)
router.delete("/delete/:id", itemsController.deleteItem);

// Claim an item (PUT /items/claim/:item_id)
router.put("/claim/:item_id", itemsController.claimItem);

// Update item details (PUT /items/update/:item_id)
router.put("/update/:item_id", itemsController.updateItem);

// Approve an item (PUT /items/approve/:item_id)
router.put("/approve/:item_id", itemsController.approveItem);

module.exports = router;
