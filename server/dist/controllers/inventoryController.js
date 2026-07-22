"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.getItems = exports.addItem = void 0;
const items_1 = __importDefault(require("../models/items"));
const notification_service_1 = require("../services/notification.service");
const addItem = async (req, res) => {
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
        const existingItem = await items_1.default.findOne({
            name: name.trim(),
        });
        if (existingItem) {
            return res.status(400).json({
                success: false,
                message: "Item already exists",
            });
        }
        const item = await items_1.default.create({
            name: name.trim(),
            category,
            quantity,
            availableQuantity: quantity,
        });
        await (0, notification_service_1.createNotification)({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.addItem = addItem;
const getItems = async (req, res) => {
    try {
        const items = await items_1.default.find().sort({
            createdAt: -1,
        });
        return res.status(200).json({
            success: true,
            items,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.getItems = getItems;
const updateItem = async (req, res) => {
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
        const item = await items_1.default.findById(id);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }
        const issuedQuantity = item.quantity - item.availableQuantity;
        if (quantity < issuedQuantity) {
            return res.status(400).json({
                success: false,
                message: "Quantity cannot be less than already issued items",
            });
        }
        item.name = name.trim();
        item.category = category;
        item.quantity = quantity;
        item.availableQuantity =
            quantity - issuedQuantity;
        await item.save();
        await (0, notification_service_1.createNotification)({
            title: "Item Updated",
            message: `${item.name} was updated.`,
            type: "info",
            module: "inventory",
            actionUrl: "/inventory",
            icon: "inventory",
        });
        if (item.availableQuantity === 0) {
            await (0, notification_service_1.createNotification)({
                title: "Out of Stock",
                message: `${item.name} is out of stock.`,
                type: "error",
                module: "inventory",
                actionUrl: "/inventory",
                icon: "warning",
            });
        }
        else if (item.availableQuantity <= 5) {
            await (0, notification_service_1.createNotification)({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.updateItem = updateItem;
const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await items_1.default.findById(id);
        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }
        await (0, notification_service_1.createNotification)({
            title: "Item Deleted",
            message: `${item.name} was removed from inventory.`,
            type: "error",
            module: "inventory",
            actionUrl: "/inventory",
            icon: "inventory",
        });
        await items_1.default.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Item deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.deleteItem = deleteItem;
//# sourceMappingURL=inventoryController.js.map