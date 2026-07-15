import { Request, Response } from "express";
import Item from "../models/items";

export const addItem = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, category, quantity } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Item name is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity cannot be negative",
      });
    }

    const existingItem = await Item.findOne({
      name: name.trim(),
    });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: "Item already exists",
      });
    }

    const item = await Item.create({
      name: name.trim(),
      category,
      quantity,
      availableQuantity: quantity,
    });

    return res.status(201).json({
      success: true,
      message: "Item added successfully",
      item,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getItems = async (
  req: Request,
  res: Response
) => {
  try {
    const items = await Item.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      items,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateItem = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { name, category, quantity } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Item name is required",
      });
    }

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required",
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity cannot be negative",
      });
    }

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    const issuedQuantity =
      item.quantity - item.availableQuantity;

    if (quantity < issuedQuantity) {
      return res.status(400).json({
        success: false,
        message:
          "Quantity cannot be less than already issued items",
      });
    }

    item.name = name.trim();
    item.category = category;
    item.quantity = quantity;
    item.availableQuantity =
      quantity - issuedQuantity;

    await item.save();

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteItem = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    await Item.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};