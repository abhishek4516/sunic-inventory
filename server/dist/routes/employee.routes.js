"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeController_1 = require("../controllers/employeeController");
const router = (0, express_1.Router)();
// Get all employees
router.get("/", employeeController_1.getEmployees);
// Add employee
router.post("/", employeeController_1.addEmployee);
// Update employee
router.put("/:id", employeeController_1.updateEmployee);
// Delete employee
router.delete("/:id", employeeController_1.deleteEmployee);
exports.default = router;
//# sourceMappingURL=employee.routes.js.map