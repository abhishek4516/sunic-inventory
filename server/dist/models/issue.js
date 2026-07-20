"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const issueSchema = new mongoose_1.Schema({
    itemId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
    },
    employeeName: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"],
    },
    remarks: {
        type: String,
        trim: true,
        default: "",
    },
    issuedBy: {
        type: String,
        default: "Admin",
    },
    status: {
        type: String,
        enum: ["Issued", "Returned"],
        default: "Issued",
    },
    issuedAt: {
        type: Date,
        default: Date.now,
    },
    returnedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
const Issue = (0, mongoose_1.model)("Issue", issueSchema);
exports.default = Issue;
//# sourceMappingURL=issue.js.map