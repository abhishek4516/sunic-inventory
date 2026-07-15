import { Router } from "express";
import {
  addItem,
  deleteItem,
  getItems,
  updateItem,
} from "../controllers/inventoryController";

const router = Router();

router.get("/", getItems);
router.post("/", addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;