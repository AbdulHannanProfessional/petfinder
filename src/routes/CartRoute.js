const express = require("express");
const router = express.Router();
const Cart =  require("../models/Cart.js")
// import
const { protect } =  require("../middleware/authMiddleware.js") // adjust to your auth middleware


router.get("/ping", (req, res) => {
  console.log("Ping route hit");
  res.json({ message: "Cart route is mounted correctly" });
});


// ✅ Get user cart
router.get("/", protect, async (req, res) => {
  console.log("checking get route in cartroute");

  try {
    console.log("userId from middleware:", req.userId);

    const cart = await Cart.findone({ userId: req.userId })
    console.log("cart query result:", cart);

    if (!cart) {
      console.log("No cart found for user:", req.userId);
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (err) {
    console.log("Error in cart get route:", err.message);
    res.status(500).json({
      message: "Server error and get route in cartroute",
      error: err.message,
    });
  }
});

// ✅ Get quantity for specific pet
router.get("/:id", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.json({ quantity: 0 });

    const item = cart.items.find((i) => i.petId.toString() === req.params.id);
    res.json({ quantity: item ? item.quantity : 0 });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Add item to cart
router.post("/", protect, async (req, res) => {

  try {
    const { petId, petName, petPrice, petImage, quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      cart = new Cart({
        userId: req.userId,
        items: [{ petId, petName, petPrice, petImage, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (i) => i.petId.toString() === petId
      );

      if (itemIndex > -1) {
        // ✅ Increment quantity if pet already in cart
        cart.items[itemIndex].quantity += quantity;
      } else {
        // ✅ Add new pet to cart
        cart.items.push({ petId, petName, petPrice, petImage, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});

// ✅ Update item quantity
router.put("/:id", protect, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.petId.toString() === req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Remove item
router.delete("/:id", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.petId.toString() !== req.params.id);
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports =  router;
