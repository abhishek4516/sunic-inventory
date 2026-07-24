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
        w-105
        overflow-hidden
        rounded-2xl
        border border-border
        bg-card
        shadow-xl
        z-50
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-500/10">
            <Bell className="h-5 w-5 text-amber-600" />
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">
              Notifications
            </h3>

            <p className="text-xs text-muted-foreground">
              {notifications.length} notification
              {notifications.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="
            rounded-lg
            px-3 py-2
            text-sm
            text-muted-foreground
            transition
            hover:bg-accent
            hover:text-foreground
          "
        >
          Close
        </button>
      </div>

      {/* Actions */}

      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <button
          onClick={markAllAsRead}
          className="
            flex items-center gap-2
            rounded-lg
            px-3 py-2
            text-sm
            font-medium
            text-muted-foreground
            transition
            hover:bg-accent
            hover:text-foreground
          "
        >
          <CheckCheck size={16} />
          Mark all read
        </button>

        <button
          onClick={clearAll}
          className="
            flex items-center gap-2
            rounded-lg
            px-3 py-2
            text-sm
            font-medium
            text-red-500
            transition
            hover:bg-red-50
            dark:hover:bg-red-900/20
          "
        >
          <Trash2 size={16} />
          Clear all
        </button>
      </div>

      {/* Content */}

      <div className="max-h-115 overflow-y-auto">
        {loading ? (
          <div className="flex h-44 items-center justify-center text-sm text-muted-foreground">
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex h-56 flex-col items-center justify-center">
            <div className="rounded-full bg-muted p-5">
              <Bell className="h-8 w-8 text-muted-foreground" />
            </div>

            <h4 className="mt-4 text-base font-medium text-foreground">
              No notifications
            </h4>

            <p className="mt-1 text-sm text-muted-foreground">
              You're all caught up.
            </p>
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
    </div>
  );
};

export default NotificationDropdown;