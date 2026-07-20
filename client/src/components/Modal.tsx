import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

function Modal({
  open,
  title,
  children,
  onClose,
}: ModalProps) {
  if (!open) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      />

      <div className="fixed left-1/2 top-1/2 z-50 w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-card text-foreground shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="text-xl font-semibold text-foreground">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors duration-300 hover:bg-accent hover:text-foreground"
          >
            ×
          </button>
        </div>

        <div className="bg-card p-6">
          {children}
        </div>
      </div>
    </>
  );
}

export default Modal;