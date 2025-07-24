const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

// Create new item
router.post('/', itemsController.createItem);

// List all items
router.get('/', itemsController.listItems);

// Get item by ID
router.get('/:id', itemsController.getItemById);

// Update item details
router.put('/:id', itemsController.updateItem);

// Delete an item
router.delete('/:id', itemsController.deleteItem);

// Claim an item
router.put('/:id/claim', itemsController.claimItem);

// Approve an item

router.put('/:id/approve', itemsController.approveItem);

module.exports = router;