import { Router } from "express";
import {
  getAllIssuedItems,
  issueItem,
} from "../controllers/issueController";

const router = Router();

router.post("/", issueItem);
router.get("/", getAllIssuedItems);

export default router;