import express from "express";
import verifyUser from "../middleware/verifyUser.js";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartItems.js";
const route = express.Router();
route.post("/add", verifyUser, addToCart);
route.post("/remove", verifyUser, removeFromCart);
route.post("/get", verifyUser, getCart);
export default route;
