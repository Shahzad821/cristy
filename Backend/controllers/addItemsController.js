import AddItems from "../models/addItems.js";

export const addItems = async (req, res) => {
  const image_fileName = `${req.file.fileName}`;
  const { name, description, price, category } = req.body;
  try {
    const newItem = new AddItems({
      name,
      description,
      price,
      category,
      image: image_fileName,
    });
    await newItem.save();
    res.status(201).json({
      message: "Item added successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add item",
      success: false,
    });
  }
};
export const itemsList = async (req, res) => {
  try {
    const items = await AddItems.find({});
    res.status(200).json({
      message: "Items fetched successfully",
      success: true,
      items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch items",
      success: false,
    });
  }
};
import fs from "fs/promises"; // Using promises for better async handling

export const removeItems = async (req, res) => {
  const { id } = req.body;
  try {
    const item = await AddItems.findById(id);
    if (!item) {
      return res.status(404).json({
        message: "Item not found",
        success: false,
      });
    }

    // Attempt to delete the image file
    try {
      await fs.unlink(`./uploads/${item.image}`);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Failed to delete image file",
        success: false,
      });
    }

    // Now delete the item from the database
    await AddItems.findByIdAndDelete(id);

    res.status(200).json({
      message: "Item deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete item",
      success: false,
    });
  }
};
