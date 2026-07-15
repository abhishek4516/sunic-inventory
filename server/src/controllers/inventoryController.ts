import { Request, Response } from "express";
import Item from "../models/items";

export const addItem = async (req: Request, res: Response) => {
  try {
    const { name, category, quantity } = req.body;

    const existingItem = await Item.findOne({ name });

    if (existingItem) {
      return res.status(400).json({
        success: false,
        message: "Item already exists",
      });
    }

    const item = await Item.create({
      name,
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

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });

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

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, quantity } = req.body;

    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    item.name = name;
    item.category = category;
    item.quantity = quantity;
    item.availableQuantity = quantity;

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

export const deleteItem = async (req: Request, res: Response) => {
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