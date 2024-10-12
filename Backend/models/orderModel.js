import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: "Processing" },
  payment: { type: Boolean, required: false },
});
const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
