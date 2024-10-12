import express from "express";
import {
  logIn,
  signUp,
} from "../../controllers/userController/userController.js";
const route = express.Router();

route.post("/login", logIn);
route.post("/signup", signUp);

export default route;
