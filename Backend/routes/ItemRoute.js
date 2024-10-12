import express from "express";
const route = express.Router();
import multer from "multer";

import {
  addItems,
  itemsList,
  removeItems,
} from "../controllers/addItemsController.js";
const storage = multer.diskStorage({
  destination: "uploads",
  fileName: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});
const uploads = multer({ storage: storage });
route.post("/add", uploads.single("image"), addItems);
route.delete("/delete", removeItems);
route.get("/get", itemsList);
export default route;
