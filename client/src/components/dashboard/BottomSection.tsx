import RecentActivity from "../RecentActivity";
import LowStockTable from "../LowStockTable";

function BottomSection() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <RecentActivity />
      </div>

      <LowStockTable />
    </div>
  );
}

export default BottomSection;