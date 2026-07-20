"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllIssuedItemsService = exports.issueItemService = void 0;
const mongoose_1 = require("mongoose");
const issue_1 = __importDefault(require("../models/issue"));
const items_1 = __importDefault(require("../models/items"));
const issueItemService = async ({ itemId, employeeName, quantity, remarks, issuedBy = "Admin", }) => {
    const item = await items_1.default.findById(itemId);
    if (!item) {
        throw new Error("Item not found");
    }
    if (quantity <= 0) {
        throw new Error("Quantity must be greater than zero");
    }
    if (item.availableQuantity < quantity) {
        throw new Error(`Only ${item.availableQuantity} item(s) available`);
    }
    item.availableQuantity -= quantity;
    await item.save();
    const issue = await issue_1.default.create({
        itemId: new mongoose_1.Types.ObjectId(itemId),
        employeeName,
        quantity,
        remarks,
        issuedBy,
        status: "Issued",
    });
    return issue;
};
exports.issueItemService = issueItemService;
const getAllIssuedItemsService = async () => {
    return await issue_1.default.find()
        .populate("itemId")
        .sort({ createdAt: -1 });
};
exports.getAllIssuedItemsService = getAllIssuedItemsService;
//# sourceMappingURL=issue.service.js.map