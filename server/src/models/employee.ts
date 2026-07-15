import { Schema, model, Document } from "mongoose";

export interface IEmployee extends Document {
  employeeId: string;
  name: string;
  department: string;
  designation: string;
  status: "Active" | "Inactive";
}

const employeeSchema = new Schema<IEmployee>(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Employee = model<IEmployee>(
  "Employee",
  employeeSchema
);

export default Employee;