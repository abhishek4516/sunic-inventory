import express from "express";
import cors from "cors";
import routes from "./routes";
import dashboardRoutes from "./routes/dashboard.routes";
import issueRoutes from "./routes/issue.routes";
import employeeRoutes from "./routes/employee.routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/issues", issueRoutes);
app.use("/api/employees", employeeRoutes);
app.get("/", (req, res) => {
  res.send("Sunic Inventory API");
});

export default app;