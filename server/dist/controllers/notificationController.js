"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllNotifications = exports.removeNotification = exports.readAllNotifications = exports.readNotification = exports.fetchNotifications = void 0;
const notification_service_1 = require("../services/notification.service");
const fetchNotifications = async (req, res) => {
    try {
        const notifications = await (0, notification_service_1.getNotifications)();
        return res.status(200).json({
            success: true,
            count: notifications.length,
            notifications,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch notifications",
        });
    }
};
exports.fetchNotifications = fetchNotifications;
const readNotification = async (req, res) => {
    try {
        const id = String(req.params.id);
        const notification = await (0, notification_service_1.markAsRead)(id);
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }
        return res.status(200).json({
            success: true,
            notification,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update notification",
        });
    }
};
exports.readNotification = readNotification;
const readAllNotifications = async (req, res) => {
    try {
        await (0, notification_service_1.markAllAsRead)();
        return res.status(200).json({
            success: true,
            message: "All notifications marked as read",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update notifications",
        });
    }
};
exports.readAllNotifications = readAllNotifications;
const removeNotification = async (req, res) => {
    try {
        const id = String(req.params.id);
        const notification = await (0, notification_service_1.deleteNotification)(id);
        if (!notification) {
            return res.status(404).json({
                success: false,
                message: "Notification not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Notification deleted",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete notification",
        });
    }
};
exports.removeNotification = removeNotification;
const removeAllNotifications = async (req, res) => {
    try {
        await (0, notification_service_1.clearNotifications)();
        return res.status(200).json({
            success: true,
            message: "All notifications cleared",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to clear notifications",
        });
    }
};
exports.removeAllNotifications = removeAllNotifications;
//# sourceMappingURL=notificationController.js.map