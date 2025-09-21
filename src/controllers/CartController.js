const Cart = require("../models/Cart.js");

const getCart = async (req, res) => {
  //   console.log("checking get route in cartroute");

  try {
    // console.log("userId from middleware:", req.userId);

    const cart = await Cart.findOne({ userId: req.userId });
    // console.log("cart query result:", cart);

    if (!cart) {
      //   console.log("No cart found for user:", req.userId);
      return res.json({ message: "no cart item found for user", items: [] });
    }

    res.json(cart);
  } catch (err) {
    // console.log("Error in cart get route:", err.message);
    res.status(500).json({
      message: "Server error and get route in cartroute",
      error: err.message,
    });
  }
};
const getCartByItem = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.json({ quantity: 0 });

    const item = cart.items.find((i) => i.petId.toString() === req.params.id);
    res.json({ quantity: item ? item.quantity : 0 });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const addItemsToCart = async (req, res) => {
  try {
    const { petName, petPrice, petImage, quantity } = req.body;

    if (!petName || !petPrice || !quantity) {
      return res
        .status(400)
        .json({ message: "petName, petPrice, and quantity are required" });
    }

    // Find existing cart
    let cart = await Cart.findOne({ userId: req.userId });

    const newItem = { petName, petPrice, petImage, quantity };

    if (!cart) {
      // Create a new cart if none exists
      cart = new Cart({
        userId: req.userId,
        items: [newItem],
      });
    } else {
      // Push new item to existing cart
      cart.items.push(newItem);
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error("Error in addItemsToCart:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i._id.toString() === req.params.id);
    if (!item) {
      console.log(item);
      return res
        .status(404)
        .json({
          message: "Item not found in cart",
          log: "checking item",
          item: item,
        });
    }

    item.quantity = quantity;
    await cart.save();
    res.json({ message: `update this pet's qunatity : ${item.petName}`, cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const deleteItemByCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const deletedItem = cart.items.find(i => i._id.toString() === req.params.id);

    if (!deletedItem) return res.status(404).json({ message: "Item not found in cart" });
    const item = cart.items.filter((i) => i._id.toString() !== req.params.id);
    cart.items = item;
    await cart.save();

    res.json({message: `deleted ${deletedItem.petName}`, cart});
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
module.exports = {
  getCart,
  getCartByItem,
  addItemsToCart,
  updateCart,
  deleteItemByCart,
};