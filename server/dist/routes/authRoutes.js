"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
/**
 * Public
 */
router.post("/login", authController_1.login);
/**
 * Protected
 */
// Cast authenticate to RequestHandler to satisfy Express typings when using a custom AuthRequest
// router.get("/me", authenticate as unknown as RequestHandler, me);
// router.post("/logout", authenticate as unknown as RequestHandler, logout);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map