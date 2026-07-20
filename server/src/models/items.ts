import { Schema, model, Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  category: string;
  quantity: number;
  availableQuantity: number;

  createdAt: Date;
  updatedAt: Date;
}
const itemSchema = new Schema<IItem>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    availableQuantity: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Item = model<IItem>("Item", itemSchema);

export default Item;