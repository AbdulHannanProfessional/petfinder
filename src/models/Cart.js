import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
      petName: { type: String, required: true },
      petPrice: { type: Number, required: true },
      petImage: { type: String },
      quantity: { type: Number, default: 1 },
    },
  ],
});
const Cart = mongoose.model("Cart", cartSchema);
export default Cart
