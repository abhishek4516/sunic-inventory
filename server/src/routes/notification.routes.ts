import { Router } from "express";
import {
  fetchNotifications,
  readNotification,
  readAllNotifications,
  removeNotification,
  removeAllNotifications,
} from "../controllers/notificationController";

const router = Router();

router.get("/", fetchNotifications);

router.patch("/read-all", readAllNotifications);

router.patch("/:id/read", readNotification);

router.delete("/clear", removeAllNotifications);

router.delete("/:id", removeNotification);

export default router;