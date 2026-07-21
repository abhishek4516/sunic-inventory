import { Request, Response } from "express";
import {
  getAllIssuedItemsService,
  issueItemService,
} from "../services/issue.service";
import { createNotification } from "../services/notification.service";

export const issueItem = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      itemId,
      employeeName,
      quantity,
      remarks,
    } = req.body;

    if (!itemId || !employeeName) {
      return res.status(400).json({
        success: false,
        message: "Item and Employee Name are required",
      });
    }

    const issue = await issueItemService({
      itemId,
      employeeName,
      quantity,
      remarks,
    });

    await createNotification({
      title: "Item Issued",
      message: `${quantity} unit(s) issued to ${employeeName}.`,
      type: "info",
      module: "issue",
    });

    return res.status(201).json({
      success: true,
      message: "Item issued successfully",
      issue,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllIssuedItems = async (
  req: Request,
  res: Response
) => {
  try {
    const issues = await getAllIssuedItemsService();

    return res.status(200).json({
      success: true,
      issues,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};