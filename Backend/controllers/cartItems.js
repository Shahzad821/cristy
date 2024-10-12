import User from "../models/userModel.js";
export const addToCart = async (req, res) => {
  const id = req.user.id;

  try {
    const userData = await User.findById(id);
    const cartData = userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId]++;
    }
    await User.findByIdAndUpdate(id, { cartData });
    res.json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error in adding product to cart" });
  }
};
export const removeFromCart = async (req, res) => {
  const id = req.user;
  try {
    const userData = await User.findById(id);
    const cartData = userData.cartData;
    if (cartData[re.body.id] > 0) {
      cartData[req.body.id]--;
    }
    await User.findByIdAndUpdate(id, { cartData });
    res.json({ success: true, message: "Product removed from cart" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error in removing product from cart" });
  }
};
export const getCart = async (req, res) => {
  const id = req.user;
  try {
    const userData = await User.findById(id);
    const cartData = userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error in fetching cart data" });
  }
};
