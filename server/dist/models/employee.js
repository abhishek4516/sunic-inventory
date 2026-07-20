"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const employeeSchema = new mongoose_1.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    designation: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
}, {
    timestamps: true,
});
const Employee = (0, mongoose_1.model)("Employee", employeeSchema);
exports.default = Employee;
//# sourceMappingURL=employee.js.map