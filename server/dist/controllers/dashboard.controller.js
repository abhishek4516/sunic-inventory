"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
const dashboard = async (req, res) => {
    try {
        const data = await (0, dashboard_service_1.getDashboardData)();
        return res.status(200).json(data);
    }
    catch (error) {
        console.error("Dashboard Error:", error);
        return res.status(500).json({
            message: "Unable to fetch dashboard",
            error: process.env.NODE_ENV !== "production"
                ? error
                : undefined,
        });
    }
};
exports.dashboard = dashboard;
//# sourceMappingURL=dashboard.controller.js.map