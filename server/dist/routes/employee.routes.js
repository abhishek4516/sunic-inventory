"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employeeController_1 = require("../controllers/employeeController");
const router = (0, express_1.Router)();
router.post("/", employeeController_1.addEmployee);
router.get("/", employeeController_1.getEmployees);
exports.default = router;
//# sourceMappingURL=employee.routes.js.map