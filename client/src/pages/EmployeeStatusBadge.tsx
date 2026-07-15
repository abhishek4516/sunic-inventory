interface EmployeeStatusBadgeProps {
  status: "Active" | "Inactive";
}

function EmployeeStatusBadge({
  status,
}: EmployeeStatusBadgeProps) {
  if (status === "Inactive") {
    return (
      <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-500">
        Inactive
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-500">
      Active
    </span>
  );
}

export default EmployeeStatusBadge;