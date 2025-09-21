const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart.js");
// import
const {
  getCart,
  getCartByItem,
  addItemsToCart,
  updateCart,
  deleteItemByCart,
  deleteCart
} = require("../controllers/CartController.js");
const { protect } = require("../middleware/authMiddleware.js"); // adjust to your auth middleware

// ✅ Get user cart
router.get("/", protect, getCart);

// ✅ Get quantity for specific pet
router.get("/:id", protect, getCartByItem);

// ✅ Add item to cart
router.post("/", protect, addItemsToCart);

// ✅ Update item quantity
router.put("/:id", protect, updateCart);

// ✅ Remove item
router.delete("/:id", protect, deleteItemByCart);
router.delete("/", protect, deleteCart)

module.exports = router;
