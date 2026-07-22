"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployees = exports.addEmployee = void 0;
const employee_1 = __importDefault(require("../models/employee"));
const notification_service_1 = require("../services/notification.service");
const addEmployee = async (req, res) => {
    try {
        const { employeeId, name, department, designation, } = req.body;
        if (!employeeId ||
            !name ||
            !department ||
            !designation) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const exists = await employee_1.default.findOne({
            employeeId,
        });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Employee already exists",
            });
        }
        const employee = await employee_1.default.create({
            employeeId,
            name,
            department,
            designation,
        });
        await (0, notification_service_1.createNotification)({
            title: "Employee Added",
            message: `${employee.name} added successfully.`,
            type: "success",
            module: "employee",
            actionUrl: "/employees",
            icon: "employee",
        });
        return res.status(201).json({
            success: true,
            employee,
        });
    }
    catch {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.addEmployee = addEmployee;
const getEmployees = async (req, res) => {
    try {
        const employees = await employee_1.default.find().sort({
            createdAt: -1,
        });
        return res.status(200).json({
            success: true,
            employees,
        });
    }
    catch {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.getEmployees = getEmployees;
//# sourceMappingURL=employeeController.js.map