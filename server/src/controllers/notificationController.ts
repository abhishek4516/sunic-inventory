import { Request, Response } from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearNotifications,
} from "../services/notification.service";

export const fetchNotifications = async (
  req: Request,
  res: Response
) => {
  try {
    const notifications = await getNotifications();

    return res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch notifications",
    });
  }
};

export const readNotification = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const notification = await markAsRead(id);

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
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update notification",
    });
  }
};

export const readAllNotifications = async (
  req: Request,
  res: Response
) => {
  try {
    await markAllAsRead();

    return res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update notifications",
    });
  }
};

export const removeNotification = async (
  req: Request,
  res: Response
) => {
  try {
    const id = String(req.params.id);

    const notification = await deleteNotification(id);

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
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete notification",
    });
  }
};

export const removeAllNotifications = async (
  req: Request,
  res: Response
) => {
  try {
    await clearNotifications();

    return res.status(200).json({
      success: true,
      message: "All notifications cleared",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to clear notifications",
    });
  }
};