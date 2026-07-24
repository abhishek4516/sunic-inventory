import { Schema, model, Document, Types } from "mongoose";

export interface IIssue extends Document {
  itemId: Types.ObjectId;
  employeeName: string;
  quantity: number;
  remarks?: string;
  issuedBy: string;
  status: "Issued" | "Returned";
  issuedAt: Date;
  returnedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const issueSchema = new Schema<IIssue>(
  {
    itemId: {
      type: Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },

    employeeName: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    issuedBy: {
      type: String,
      default: "Admin",
    },

    status: {
      type: String,
      enum: ["Issued", "Returned"],
      default: "Issued",
    },

    issuedAt: {
      type: Date,
      default: Date.now,
    },

    returnedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Issue = model<IIssue>("Issue", issueSchema);

export default Issue;