import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import IssueItems from "./pages/IssueItems";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/issue-items" element={<IssueItems />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/employee" element={<EmployeeDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;