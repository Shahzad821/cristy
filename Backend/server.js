import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoute from "./routes/userRoutes/userRoutes.js";
import paymentRoute from "./routes/paymentRoutes.js";
import cartRoute from "./routes/cartRoutes.js";
import itemsRoute from "./routes/ItemRoute.js";
import queryRoute from "./routes/queryRouter.js";
import { connectDB } from "./config/db/dataBase.js";
// ----------------------------------------------------------//
const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ------------------------------------------------------------//
app.use("/api/items", itemsRoute);
app.use("/api/user", userRoute);
app.use("/api/order", paymentRoute);
app.use("/api/cart", cartRoute);
app.use("/api/search", queryRoute);
const startServer = async () => {
  try {
    connectDB();
    await app.listen(port);
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
