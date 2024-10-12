import User from "../../models/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs"; // Corrected import
import { generateJWT } from "../../utils/generateJWT.js";

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found!" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password!" });
    }

    const token = generateJWT(user._id); // Generate JWT and store it
    res.json({ success: true, message: "Logged in successfully!", token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error in login controller!" });
  }
};

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res
        .status(409) // Changed to 409 Conflict
        .json({ success: false, message: "User already exists!" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400) // Changed to 400 Bad Request
        .json({ success: false, message: "Invalid email!" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        // Changed to 400 Bad Request
        success: false,
        message: "Password must be at least 6 characters long!",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = generateJWT(user._id);
    res
      .status(201)
      .json({ success: true, message: "User created successfully!", token });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error in create user controller!" });
  }
};
