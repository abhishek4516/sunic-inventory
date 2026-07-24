import { Router } from "express";
import {
  addEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController";

const router = Router();

// Get all employees
router.get("/", getEmployees);

// Add employee
router.post("/", addEmployee);

// Update employee
router.put("/:id", updateEmployee);

// Delete employee
router.delete("/:id", deleteEmployee);

export default router;