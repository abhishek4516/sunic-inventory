import { Router } from "express";

import authRoutes from "./authRoutes";
import inventoryRoutes from "./inventoryRoutes";
import employeeRoutes from "./employee.routes";
import issueRoutes from "./issue.routes";
import dashboardRoutes from "./dashboard.routes";
import notificationRoutes from "./notification.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/inventory", inventoryRoutes);
router.use("/employees", employeeRoutes);
router.use("/issues", issueRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/notifications", notificationRoutes);

export default router;