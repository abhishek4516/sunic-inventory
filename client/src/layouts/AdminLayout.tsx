import type { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useSidebar } from "../context/SidebarContext";

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="h-screen bg-background text-foreground transition-colors duration-300">
      <Sidebar />

      <div
        className={`flex h-screen flex-col transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Navbar />

        <main className="flex-1 overflow-y-auto bg-background p-6 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;