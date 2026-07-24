import {
  Boxes,
  ChevronLeft,
  FileText,
  LayoutDashboard,
  PackagePlus,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import Tooltip from "../components/Tooltip";

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
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        aria-label={
          isCollapsed ? "Expand sidebar" : "Collapse sidebar"
        }
        className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-md border border-border bg-background text-muted-foreground shadow-sm transition hover:border-amber-500/40 hover:text-amber-500"
      >
        <ChevronLeft
          size={14}
          className={`transition-transform duration-300 ${
            isCollapsed ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Logo Section */}
      <div
        className={`flex items-center gap-3 border-b border-border px-5 ${
          isCollapsed ? "h-20 justify-center px-0" : "h-20"
        }`}
      >
        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center">
          {/* Outer rotating border */}
          <div className="absolute inset-0 animate-[spin_8s_linear_infinite] rounded-full border-2 border-dashed border-amber-500/30" />
          {/* Inner static circle */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm">
            <img
              src="/favicon.png"
              alt="Logo"
              className="h-8 w-8 rounded-full object-contain"
            />
          </div>
        </div>

        {!isCollapsed && (
          <div className="leading-tight">
            <div className="relative">
              <div className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-sm font-bold tracking-[0.2em] text-transparent">
                SUNIC
              </div>
              {/* Underline glow effect */}
              <div className="absolute -bottom-1 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {!isCollapsed && (
          <div className="mb-3 px-3">
            {/* <div className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/70">
              MENU
            </div> */}
            {/* Decorative line after menu label */}
            <div className="mt-2 h-px bg-gradient-to-r from-amber-500/20 via-transparent to-transparent" />
          </div>
        )}

        {menu.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group relative mb-1 flex items-center rounded-md px-3 py-2.5 text-sm transition-all duration-300 ${
                  isActive
                    ? "bg-amber-500/10 text-amber-500"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                } ${
                  isCollapsed ? "justify-center" : ""
                }`
              }
              style={({ isActive }) => ({
                animationDelay: isActive ? "0ms" : `${index * 50}ms`,
              })}
            >
              {({ isActive }) => (
                <>
                  {/* Active indicator - multiple layered dots */}
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-50"
                    }`}
                  >
                    <span className="block h-1.5 w-1.5 translate-x-1 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                  </span>

                  {/* Background glow effect on active */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-md bg-gradient-to-r from-amber-500/5 to-transparent" />
                  )}

                  {isCollapsed ? (
                    <Tooltip content={item.title}>
                      <div className="relative flex items-center justify-center">
                        {/* Icon pulse ring */}
                        {isActive && (
                          <span className="absolute h-8 w-8 animate-ping rounded-full bg-amber-500/10 duration-1000" />
                        )}
                        <Icon
                          size={18}
                          strokeWidth={isActive ? 2.25 : 1.75}
                          className={`relative transition-transform duration-300 group-hover:scale-110 ${
                            isActive ? "drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]" : ""
                          }`}
                        />
                      </div>
                    </Tooltip>
                  ) : (
                    <>
                      <div className="relative">
                        {/* Icon container with gradient background on hover */}
                        <div className={`relative rounded-md p-1 transition-all duration-300 ${
                          isActive 
                            ? "bg-amber-500/10" 
                            : "group-hover:bg-amber-500/5"
                        }`}>
                          <Icon
                            size={18}
                            strokeWidth={isActive ? 2.25 : 1.75}
                            className={`transition-all duration-300 group-hover:scale-110 ${
                              isActive ? "drop-shadow-[0_0_6px_rgba(245,158,11,0.4)]" : ""
                            }`}
                          />
                        </div>
                      </div>

                      <span className="ml-3 font-medium transition-all duration-300 group-hover:translate-x-1">
                        {item.title}
                      </span>

                      {/* Active subtle indicator arrow */}
                      {isActive && (
                        <span className="ml-auto opacity-0 transition-all duration-300 group-hover:opacity-100">
                          <span className="text-[10px] text-amber-500">◆</span>
                        </span>
                      )}
                    </>
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Decorative element at bottom of nav */}
        {!isCollapsed && (
          <div className="mx-4 mt-6">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
            {/* <div className="mt-4 rounded-lg border border-amber-500/10 bg-amber-500/5 p-3">
              <div className="text-xs font-medium text-amber-500/80">
                Pro Tip
              </div>
              <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground/70">
                Use keyboard shortcuts to navigate faster
              </p>
              <div className="mt-2 flex items-center gap-2">
                <kbd className="rounded border border-amber-500/20 bg-amber-500/5 px-1.5 py-0.5 text-[10px] text-amber-500/80">
                  Ctrl
                </kbd>
                <span className="text-[10px] text-muted-foreground/50">
                  + K
                </span>
              </div>
            </div> */}
          </div>
        )}
      </nav>

      {/* Bottom decorative border */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-500/10 to-transparent" />
    </aside>
  );
}

export default Sidebar;