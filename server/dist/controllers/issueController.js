"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllIssuedItems = exports.issueItem = void 0;
const issue_service_1 = require("../services/issue.service");
const issueItem = async (req, res) => {
    try {
        const { itemId, employeeName, quantity, remarks, } = req.body;
        if (!itemId || !employeeName) {
            return res.status(400).json({
                success: false,
                message: "Item and Employee Name are required",
            });
        }
        const issue = await (0, issue_service_1.issueItemService)({
            itemId,
            employeeName,
            quantity,
            remarks,
        });
        return res.status(201).json({
            success: true,
            message: "Item issued successfully",
            issue,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
exports.issueItem = issueItem;
const getAllIssuedItems = async (req, res) => {
    try {
        const issues = await (0, issue_service_1.getAllIssuedItemsService)();
        return res.status(200).json({
            success: true,
            issues,
        });
    }
    catch {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.getAllIssuedItems = getAllIssuedItems;
//# sourceMappingURL=issueController.js.map