import { Request, Response } from "express";
import { getDashboardData } from "../services/dashboard.service";

export const dashboard = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await getDashboardData();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch dashboard",
    });
  }
};