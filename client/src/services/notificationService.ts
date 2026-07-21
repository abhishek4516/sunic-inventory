import api from "./api";
import type {
  Notification,
  NotificationResponse,
} from "../types/notification";

export const getNotifications = async (): Promise<Notification[]> => {
  const { data } =
    await api.get<NotificationResponse>("/notifications");

  return data.notifications;
};

export const markNotificationAsRead = async (
  id: string
) => {
  await api.patch(`/notifications/${id}/read`);
};

export const markAllNotificationsAsRead = async () => {
  await api.patch("/notifications/read-all");
};

export const deleteNotification = async (
  id: string
) => {
  await api.delete(`/notifications/${id}`);
};

export const clearNotifications = async () => {
  await api.delete("/notifications/clear");
};