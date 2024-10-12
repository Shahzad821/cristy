import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import User from "../models/userModel.js";

const stripe = new Stripe(process.env._SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const { items, amount, address } = req.body;
    const userId = req.user.id;

    const newOrder = new orderModel({
      items,
      amount,
      address,
      userId,
    });
    await newOrder.save();

    await User.findByIdAndUpdate(userId, { cartData: {} });

    const line_Items = items.map((item) => ({
      price_data: {
        currency: "pkr",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 270 * 100),
      },
      quantity: item.quantity,
    }));

    line_Items.push({
      price_data: {
        currency: "pkr",
        product_data: {
          name: "Shipping",
        },
        unit_amount: Math.round(2 * 270 * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_Items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(200).json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error creating payment intent:", error);

    res
      .status(500)
      .json({ success: false, message: "Error in payment intent!" });
  }
};
export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({ success: true, message: "Payment successful!" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.status(200).json({ success: false, message: "Payment failed!" });
    }
  } catch (error) {
    console.error("Error verifying order:", error);
    res
      .status(500)
      .json({ success: false, message: "Error in verifying order!" });
  }
};

export const userOrder = async (req, res) => {
  const id = req.user.id;
  try {
    const orders = await orderModel.find({ userId: id });
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res
      .status(500)
      .json({ success: false, message: "Error in fetching user orders!" });
  }
};
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error listing orders:", error);
    res
      .status(500)
      .json({ success: false, message: "Error in listing orders!" });
  }
};
export const updateStatus = async (req, res) => {
  const { id, status } = req.body.id;
  try {
    await orderModel.findByIdAndUpdate(id, { status: status });
    res
      .status(200)
      .json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res
      .status(500)
      .json({ success: false, message: "Error in updating order status!" });
  }
};
