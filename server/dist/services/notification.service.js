"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearNotifications = exports.deleteNotification = exports.markAllAsRead = exports.markAsRead = exports.getNotifications = exports.createNotification = void 0;
const notification_1 = __importDefault(require("../models/notification"));
const createNotification = async (payload) => {
    try {
        return await notification_1.default.create({
            ...payload,
            isRead: false,
        });
    }
    catch (error) {
        console.error("Notification Error:", error);
    }
};
exports.createNotification = createNotification;
const getNotifications = async () => {
    return await notification_1.default.find()
        .sort({ createdAt: -1 })
        .limit(30);
};
exports.getNotifications = getNotifications;
const markAsRead = async (id) => {
    return await notification_1.default.findByIdAndUpdate(id, { isRead: true }, { new: true });
};
exports.markAsRead = markAsRead;
const markAllAsRead = async () => {
    return await notification_1.default.updateMany({ isRead: false }, { isRead: true });
};
exports.markAllAsRead = markAllAsRead;
const deleteNotification = async (id) => {
    return await notification_1.default.findByIdAndDelete(id);
};
exports.deleteNotification = deleteNotification;
const clearNotifications = async () => {
    return await notification_1.default.deleteMany({});
};
exports.clearNotifications = clearNotifications;
//# sourceMappingURL=notification.service.js.map