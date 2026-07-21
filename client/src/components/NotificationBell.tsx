import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import { useNotifications } from "../hooks/useNotifications";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { unreadCount } = useNotifications();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          relative
          p-2
          rounded-xl
          transition
          hover:bg-gray-100
          dark:hover:bg-slate-800"
      >
        <Bell className="w-6 h-6" />

        {unreadCount > 0 && (
          <span
            className="
              absolute
              -top-1
              -right-1
              min-w-[20px]
              h-5
              px-1
              rounded-full
              bg-red-500
              text-white
              text-[11px]
              flex
              items-center
              justify-center
              font-semibold
              animate-pulse"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      <NotificationDropdown
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default NotificationBell;