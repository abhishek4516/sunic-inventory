"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.addEmployee = exports.getEmployees = void 0;
const employee_1 = __importDefault(require("../models/employee"));
const notification_service_1 = require("../services/notification.service");
// ==========================
// Get All Employees
// ==========================
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
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch employees",
        });
    }
};
exports.getEmployees = getEmployees;
// ==========================
// Add Employee
// ==========================
const addEmployee = async (req, res) => {
    try {
        const { employeeId, name, department, designation, status, } = req.body;
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
                message: "Employee ID already exists",
            });
        }
        const employee = await employee_1.default.create({
            employeeId,
            name,
            department,
            designation,
            status: status || "Active",
        });
        await (0, notification_service_1.createNotification)({
            title: "Employee Added",
            message: `${employee.name} was added successfully.`,
            type: "success",
            module: "employee",
            actionUrl: "/employee",
            icon: "employee",
        });
        return res.status(201).json({
            success: true,
            message: "Employee added successfully",
            employee,
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
exports.addEmployee = addEmployee;
// ==========================
// Update Employee
// ==========================
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employee_1.default.findById(id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }
        Object.assign(employee, req.body);
        await employee.save();
        await (0, notification_service_1.createNotification)({
            title: "Employee Updated",
            message: `${employee.name} was updated.`,
            type: "info",
            module: "employee",
            actionUrl: "/employee",
            icon: "employee",
        });
        return res.status(200).json({
            success: true,
            message: "Employee updated successfully",
            employee,
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
exports.updateEmployee = updateEmployee;
// ==========================
// Delete Employee
// ==========================
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employee_1.default.findById(id);
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }
        await employee.deleteOne();
        await (0, notification_service_1.createNotification)({
            title: "Employee Deleted",
            message: `${employee.name} was removed.`,
            type: "warning",
            module: "employee",
            actionUrl: "/employee",
            icon: "employee",
        });
        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully",
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
exports.deleteEmployee = deleteEmployee;
//# sourceMappingURL=employeeController.js.map