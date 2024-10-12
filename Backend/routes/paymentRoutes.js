import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import {
  createPaymentIntent,
  listOrders,
  updateStatus,
  userOrder,
  verifyOrder,
} from "../controllers/orderController.js";
const route = express.Router();

route.post("/place", verifyUser, createPaymentIntent);
route.post("/verify", verifyOrder);
route.post("/userorders", verifyUser, userOrder);

route.get("/list", listOrders);
route.post("/status", updateStatus);
export default route;
