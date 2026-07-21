import { Types } from "mongoose";
import Issue from "../models/issue";
import Item from "../models/items";
import { createNotification } from "./notification.service";

interface IssueItemData {
  itemId: string;
  employeeName: string;
  quantity: number;
  remarks?: string;
  issuedBy?: string;
}

export const issueItemService = async ({
  itemId,
  employeeName,
  quantity,
  remarks,
  issuedBy = "Admin",
}: IssueItemData) => {
  const item = await Item.findById(itemId);

  if (!item) {
    throw new Error("Item not found");
  }

  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero");
  }

  if (item.availableQuantity < quantity) {
    throw new Error(
      `Only ${item.availableQuantity} item(s) available`
    );
  }

  item.availableQuantity -= quantity;

  await item.save();

  const issue = await Issue.create({
    itemId: new Types.ObjectId(itemId),
    employeeName,
    quantity,
    remarks,
    issuedBy,
    status: "Issued",
  });

  await createNotification({
    title: "Item Issued",
    message: `${quantity} ${item.name}(s) issued to ${employeeName}.`,
    type: "info",
    module: "issue",
  });

  if (item.availableQuantity === 0) {
    await createNotification({
      title: "Out of Stock",
      message: `${item.name} is now out of stock.`,
      type: "error",
      module: "inventory",
    });
  } else if (item.availableQuantity <= 5) {
    await createNotification({
      title: "Low Stock",
      message: `${item.name} has only ${item.availableQuantity} unit(s) remaining.`,
      type: "warning",
      module: "inventory",
    });
  }

  return issue;
};

export const getAllIssuedItemsService = async () => {
  return await Issue.find()
    .populate("itemId")
    .sort({ createdAt: -1 });
};