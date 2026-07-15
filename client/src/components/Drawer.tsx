import { ReactNode } from "react";

interface DrawerProps {
  open: boolean;
  title: string;
  width?: string;
  children: ReactNode;
  onClose: () => void;
}

function Drawer({
  open,
  title,
  width = "420px",
  children,
  onClose,
}: DrawerProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      />

      <div
        style={{ width }}
        className={`fixed right-0 top-0 z-50 flex h-screen flex-col border-l border-border bg-card text-foreground shadow-2xl transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-xl font-semibold text-foreground">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-card p-6">
          {children}
        </div>
      </div>
    </>
  );
}

export default Drawer;