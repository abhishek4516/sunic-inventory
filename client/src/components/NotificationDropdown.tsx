import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NotificationItem from "./NotificationItem";
import { useNotifications } from "../hooks/useNotifications";

interface NotificationDropdownProps {
  open: boolean;
  onClose: () => void;
}

const NotificationDropdown = ({
  open,
  onClose,
}: NotificationDropdownProps) => {
  const navigate = useNavigate();

  const {
    notifications,
    loading,
    markAsRead,
    markAllAsRead,
    clearAll,
  } = useNotifications();

  if (!open) return null;

  const handleNotificationClick = async (
    id: string,
    actionUrl: string
  ) => {
    await markAsRead(id);

    navigate(actionUrl);

    onClose();
  };

  return (
    <div
      className="
      absolute right-0 mt-3
      w-[420px]
      max-h-[600px]
      rounded-2xl
      bg-white
      dark:bg-slate-900
      shadow-2xl
      border
      border-gray-200
      dark:border-slate-700
      overflow-hidden
      z-50"
    >
      {/* Header */}

      <div className="flex items-center justify-between px-5 py-4 border-b dark:border-slate-700">
        <div>
          <h3 className="font-semibold text-lg">
            Notifications
          </h3>

          <p className="text-xs text-gray-500">
            {notifications.length} total
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={markAllAsRead}
            className="
            flex items-center gap-1
            text-sm
            px-3 py-2
            rounded-lg
            hover:bg-gray-100
            dark:hover:bg-slate-800"
          >
            <CheckCheck className="w-4 h-4" />
            Read all
          </button>

          <button
            onClick={clearAll}
            className="
            flex items-center gap-1
            text-sm
            px-3 py-2
            rounded-lg
            text-red-500
            hover:bg-red-50
            dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Content */}

      <div className="max-h-[470px] overflow-y-auto">
        {loading ? (
          <div className="p-10 text-center text-gray-500">
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-16 flex flex-col items-center text-gray-500">
            <Bell className="w-10 h-10 mb-4 opacity-40" />

            <p>No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onClick={() =>
                handleNotificationClick(
                  notification._id,
                  notification.actionUrl
                )
              }
            />
          ))
        )}
      </div>

      {/* Footer */}

      <div className="border-t dark:border-slate-700 px-5 py-3 text-center">
        <button
          onClick={onClose}
          className="
          text-sm
          text-blue-600
          hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown;