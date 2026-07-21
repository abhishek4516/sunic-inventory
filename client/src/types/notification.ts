export type NotificationType =
  | "success"
  | "info"
  | "warning"
  | "error";

export type NotificationModule =
  | "inventory"
  | "issue"
  | "employee"
  | "system";

export type NotificationIcon =
  | "inventory"
  | "issue"
  | "employee"
  | "warning"
  | "system";

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: NotificationType;
  module: NotificationModule;
  icon: NotificationIcon;
  actionUrl: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationResponse {
  success: boolean;
  count: number;
  notifications: Notification[];
}