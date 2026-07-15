import {
  Boxes,
  ChevronLeft,
  FileText,
  LayoutDashboard,
  LogOut,
  PackagePlus,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

const menu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Inventory",
    path: "/inventory",
    icon: Boxes,
  },
  {
    title: "Employees",
    path: "/employee",
    icon: Users,
  },
  {
    title: "Issue Items",
    path: "/issue-items",
    icon: PackagePlus,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: FileText,
  },
];

function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-border bg-card text-foreground transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <button
        onClick={toggleSidebar}
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-md border border-border bg-background text-muted-foreground shadow-sm transition hover:border-amber-500/40 hover:text-amber-500"
      >
        <ChevronLeft
          size={14}
          className={`transition-transform duration-300 ${
            isCollapsed ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`flex items-center gap-3 border-b border-border px-5 ${
          isCollapsed ? "h-20 justify-center px-0" : "h-20"
        }`}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-amber-500/30 bg-amber-500/10 font-mono text-sm font-bold tracking-tight text-amber-500">
          S
        </div>

        {!isCollapsed && (
          <div className="leading-tight">
            <div className="text-sm font-bold tracking-[0.2em] text-foreground">
              SUNIC
            </div>

            <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
              INVENTORY OS
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {!isCollapsed && (
          <div className="mb-2 px-3 font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
            MENU
          </div>
        )}

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative mb-1 flex items-center rounded-md px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-amber-500/10 text-amber-500"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-amber-500 transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />

                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.25 : 1.75}
                  />

                  {!isCollapsed && (
                    <span className="ml-3 font-medium">
                      {item.title}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <button
          className={`flex w-full items-center rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut
            size={18}
            strokeWidth={1.75}
          />

          {!isCollapsed && (
            <span className="ml-3 font-medium">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;