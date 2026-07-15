import InventoryChart from "../InventoryChart";
import CategoryChart from "../CategoryChart";
import QuickActions from "../QuickActions";

function ChartsSection() {
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <InventoryChart />
      </div>

      <QuickActions />

      <div className="xl:col-span-3">
        <CategoryChart />
      </div>
    </div>
  );
}

export default ChartsSection;