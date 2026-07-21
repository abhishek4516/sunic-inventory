import Notification from "../models/notification";

interface NotificationPayload {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  module: "inventory" | "issue" | "employee" | "system";
  actionUrl: string;
  icon:
    | "inventory"
    | "issue"
    | "employee"
    | "warning"
    | "system";
}

export const createNotification = async (
  payload: NotificationPayload
) => {
  try {
    return await Notification.create({
      ...payload,
      isRead: false,
    });
  } catch (error) {
    console.error("Notification Error:", error);
  }
};

export const getNotifications = async () => {
  return await Notification.find()
    .sort({ createdAt: -1 })
    .limit(30);
};

export const markAsRead = async (id: string) => {
  return await Notification.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true }
  );
};

export const markAllAsRead = async () => {
  return await Notification.updateMany(
    { isRead: false },
    { isRead: true }
  );
};

export const deleteNotification = async (id: string) => {
  return await Notification.findByIdAndDelete(id);
};

export const clearNotifications = async () => {
  return await Notification.deleteMany({});
};