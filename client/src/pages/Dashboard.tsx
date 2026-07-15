import AdminLayout from "../layouts/AdminLayout";
import DashboardHeader from "../components/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import ChartsSection from "../components/dashboard/ChartsSection";
import BottomSection from "../components/dashboard/BottomSection";

function Dashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <DashboardHeader />

        <StatsGrid />

        <ChartsSection />

        <BottomSection />
      </div>
    </AdminLayout>
  );
}

export default Dashboard;