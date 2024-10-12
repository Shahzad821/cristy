import express from "express";
import AddItems from "../models/addItems.js";

// Get all products with filtering, sorting, and pagination
export const getAllProducts = async (req, res) => {
  const { category, name, numericFilters, sort, fields } = req.query; // Added 'fields' for selection
  const queryObject = {};

  try {
    // Filter by category
    if (category) {
      queryObject.category = category;
    }

    // Filter by name with regex
    if (name) {
      queryObject.name = { $regex: name, $options: "i" }; // Case-insensitive
    }

    // Numeric filters
    if (numericFilters) {
      const operatorMap = {
        ">": "$gt",
        ">=": "$gte",
        "=": "$eq",
        "<": "$lt",
        "<=": "$lte",
      };
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace(
        regEx,
        (match) => `-${operatorMap[match]}-`
      );

      const options = ["price"]; // Add more fields as needed
      filters.split(",").forEach((item) => {
        const [field, operator, value] = item.split("-");
        if (options.includes(field)) {
          queryObject[field] = { [operator]: Number(value) }; // Ensure the value is a number
        }
      });
    }

    // Fetching products
    let result = AddItems.find(queryObject); // Find method returns a query object

    // Sorting
    if (sort) {
      const sortList = sort.split(",").join(" ");
      result = result.sort(sortList);
    }

    // Field selection
    if (fields) {
      const fieldsList = fields.split(",").join(" ");
      result = result.select(fieldsList);
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit); // Corrected 'limimt' to 'limit'

    const products = await result; // Await the result to fetch the products
    res.status(200).json({ products, nbHits: products.length }); // Return the products and the count
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
