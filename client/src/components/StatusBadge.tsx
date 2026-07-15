interface StatusBadgeProps {
  availableQuantity: number;
}

function StatusBadge({
  availableQuantity,
}: StatusBadgeProps) {
  if (availableQuantity === 0) {
    return (
      <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-500">
        Out of Stock
      </span>
    );
  }

  if (availableQuantity <= 5) {
    return (
      <span className="inline-flex rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-500">
        Low Stock
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-500">
      In Stock
    </span>
  );
}

export default StatusBadge;