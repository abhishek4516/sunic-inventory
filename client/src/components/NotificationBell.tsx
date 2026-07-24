import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import { useNotifications } from "../hooks/useNotifications";
import Tooltip from "./Tooltip";

function NotificationBell() {
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
      <Tooltip content="Notifications">
  <button
    onClick={() => setOpen((prev) => !prev)}
    aria-label="Notifications"
    className="relative rounded-full border border-border bg-background p-2 text-muted-foreground transition-all duration-300 hover:bg-accent hover:text-foreground"
  >
    <Bell size={18} strokeWidth={1.75} />

    {unreadCount > 0 && (
      <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
        {unreadCount > 99 ? "99+" : unreadCount}
      </span>
    )}
  </button>
</Tooltip>

      <NotificationDropdown
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default NotificationBell;