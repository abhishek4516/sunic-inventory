import { Router, RequestHandler } from "express";
import {
  login,
  logout,
  me,
} from "../controllers/authController";
import { authenticate } from "../middleware/authenticate";

const router = Router();

/**
 * Public
 */
router.post("/login", login);

/**
 * Protected
 */
// Cast authenticate to RequestHandler to satisfy Express typings when using a custom AuthRequest
// router.get("/me", authenticate as unknown as RequestHandler, me);

// router.post("/logout", authenticate as unknown as RequestHandler, logout);

export default router;