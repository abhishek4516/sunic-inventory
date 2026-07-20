"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const itemSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    availableQuantity: {
        type: Number,
        required: true,
        min: 0,
    },
}, {
    timestamps: true,
});
const Item = (0, mongoose_1.model)("Item", itemSchema);
exports.default = Item;
//# sourceMappingURL=items.js.map