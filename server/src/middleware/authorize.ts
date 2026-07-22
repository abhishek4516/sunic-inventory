import { Response, NextFunction } from "express";
import { AuthRequest } from "./authenticate";

export const authorize =
  (...roles: ("admin" | "employee")[]) =>
  (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };