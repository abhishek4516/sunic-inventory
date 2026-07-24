import { Request, Response } from "express";
import { getDashboardData } from "../services/dashboard.service";

export const dashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getDashboardData();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Dashboard Error:", error);

    return res.status(500).json({
      message: "Unable to fetch dashboard",
      error:
        process.env.NODE_ENV !== "production"
          ? error
          : undefined,
    });
  }
};