import Modal from "./Modal";

interface DeleteDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onDelete: () => void;
}

function DeleteDialog({
  open,
  title,
  onClose,
  onDelete,
}: DeleteDialogProps) {
  return (
    <Modal
      open={open}
      title="Delete Item"
      onClose={onClose}
    >
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-foreground">
            {title}
          </span>
          ?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-border bg-background px-5 py-2 text-foreground transition-colors duration-300 hover:bg-accent"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="rounded-lg bg-red-500 px-5 py-2 text-white transition-colors duration-300 hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteDialog;