import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
  title: string;
  message: string;
  type: "success" | "info" | "warning" | "error";
  module: "inventory" | "issue" | "employee" | "system";
  actionUrl: string;
  icon: "inventory" | "issue" | "employee" | "warning" | "system";
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["success", "info", "warning", "error"],
      default: "info",
    },

    module: {
      type: String,
      enum: ["inventory", "issue", "employee", "system"],
      required: true,
    },

    actionUrl: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      enum: [
        "inventory",
        "issue",
        "employee",
        "warning",
        "system",
      ],
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<INotification>(
  "Notification",
  notificationSchema
);