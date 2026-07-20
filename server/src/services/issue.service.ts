import { Types } from "mongoose";
import Issue from "../models/issue";
import Item from "../models/items";
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

  return issue;
};

export const getAllIssuedItemsService = async () => {
  return await Issue.find()
    .populate("itemId")
    .sort({ createdAt: -1 });
};