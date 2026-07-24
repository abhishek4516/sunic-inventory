import { Request, Response } from "express";
import Employee from "../models/employee";
import { createNotification } from "../services/notification.service";

// ==========================
// Get All Employees
// ==========================
export const getEmployees = async (
  req: Request,
  res: Response
) => {
  try {
    const employees = await Employee.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
    });
  }
};

// ==========================
// Add Employee
// ==========================
export const addEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      employeeId,
      name,
      department,
      designation,
      status,
    } = req.body;

    if (
      !employeeId ||
      !name ||
      !department ||
      !designation
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const exists = await Employee.findOne({
      employeeId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Employee ID already exists",
      });
    }

    const employee = await Employee.create({
      employeeId,
      name,
      department,
      designation,
      status: status || "Active",
    });

    await createNotification({
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
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Update Employee
// ==========================
export const updateEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    Object.assign(employee, req.body);

    await employee.save();

    await createNotification({
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
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ==========================
// Delete Employee
// ==========================
export const deleteEmployee = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    await employee.deleteOne();

    await createNotification({
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
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};