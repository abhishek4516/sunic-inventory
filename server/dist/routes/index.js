"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const inventoryRoutes_1 = __importDefault(require("./inventoryRoutes"));
const employee_routes_1 = __importDefault(require("./employee.routes"));
const issue_routes_1 = __importDefault(require("./issue.routes"));
const dashboard_routes_1 = __importDefault(require("./dashboard.routes"));
const notification_routes_1 = __importDefault(require("./notification.routes"));
const router = (0, express_1.Router)();
router.use("/auth", authRoutes_1.default);
router.use("/inventory", inventoryRoutes_1.default);
router.use("/employees", employee_routes_1.default);
router.use("/issues", issue_routes_1.default);
router.use("/dashboard", dashboard_routes_1.default);
router.use("/notifications", notification_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map