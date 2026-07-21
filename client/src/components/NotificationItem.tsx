import { Bell, Boxes, PackageCheck, TriangleAlert, User } from "lucide-react";
import type { Notification } from "../types/notification";

interface NotificationItemProps {
  notification: Notification;
  onClick: () => void;
}

const NotificationItem = ({
  notification,
  onClick,
}: NotificationItemProps) => {
  const getIcon = () => {
    switch (notification.icon) {
      case "inventory":
        return <Boxes className="w-5 h-5 text-blue-500" />;

      case "issue":
        return <PackageCheck className="w-5 h-5 text-green-500" />;

      case "employee":
        return <User className="w-5 h-5 text-purple-500" />;

      case "warning":
        return (
          <TriangleAlert className="w-5 h-5 text-orange-500" />
        );

      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const timeAgo = () => {
    const seconds = Math.floor(
      (Date.now() -
        new Date(notification.createdAt).getTime()) /
        1000
    );

    if (seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) return `${minutes}m ago`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24) return `${hours}h ago`;

    const days = Math.floor(hours / 24);

    return `${days}d ago`;
  };

  return (
    <button
      onClick={onClick}
      className={`w-full text-left transition-all duration-200
      hover:bg-gray-100 dark:hover:bg-slate-700
      px-4 py-3 border-b border-gray-100 dark:border-slate-700

      ${
        !notification.isRead
          ? "bg-blue-50 dark:bg-slate-800"
          : ""
      }`}
    >
      <div className="flex gap-3">
        <div className="mt-1">{getIcon()}</div>

        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="font-semibold text-sm">
              {notification.title}
            </h4>

            <span className="text-xs text-gray-500">
              {timeAgo()}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {notification.message}
          </p>
        </div>

        {!notification.isRead && (
          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
        )}
      </div>
    </button>
  );
};

export default NotificationItem;