import { Request, Response } from "express";
import Item from "../models/items";
import { createNotification } from "../services/notification.service";

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

    await createNotification({
      title: "Item Added",
      message: `${item.name} (${item.quantity} units) added to inventory.`,
      type: "success",
      module: "inventory",
      actionUrl: "/inventory",
      icon: "inventory",
    });

    return res.status(201).json({
      success: true,
      message: "Item added successfully",
      item,
    });
  } catch (error) {
    console.error(error);

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
  } catch (error) {
    console.error(error);

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

    await createNotification({
      title: "Item Updated",
      message: `${item.name} was updated.`,
      type: "info",
      module: "inventory",
      actionUrl: "/inventory",
      icon: "inventory",
    });

    if (item.availableQuantity === 0) {
      await createNotification({
        title: "Out of Stock",
        message: `${item.name} is out of stock.`,
        type: "error",
        module: "inventory",
        actionUrl: "/inventory",
        icon: "warning",
      });
    } else if (item.availableQuantity <= 5) {
      await createNotification({
        title: "Low Stock",
        message: `${item.name} has only ${item.availableQuantity} units remaining.`,
        type: "warning",
        module: "inventory",
        actionUrl: "/inventory",
        icon: "warning",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item updated successfully",
      item,
    });
  } catch (error) {
    console.error(error);

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

    await createNotification({
      title: "Item Deleted",
      message: `${item.name} was removed from inventory.`,
      type: "error",
      module: "inventory",
      actionUrl: "/inventory",
      icon: "inventory",
    });

    await Item.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};