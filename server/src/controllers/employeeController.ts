import { Request, Response } from "express";
import Employee from "../models/employee";
import { createNotification } from "../services/notification.service";

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
        message: "Employee already exists",
      });
    }

    const employee = await Employee.create({
      employeeId,
      name,
      department,
      designation,
    });

    await createNotification({
      title: "Employee Added",
      message: `${employee.name} (${employee.employeeId}) joined the ${employee.department} department as ${employee.designation}.`,
      type: "success",
      module: "employee",
    });

    return res.status(201).json({
      success: true,
      employee,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

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
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};