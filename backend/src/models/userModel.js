import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    hiringDate: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Suspended", "Terminated", "Retired", "Resigned"],
      required: true,
      default: "Active",
    },
    role: {
      type: String,
      enum: ["Admin", "Manager", "Employee"],
      required: true,
      default: "Employee",
    },
    shiftStartTime: {
      type: String,
      required: true,
      default: "09:00",
    },
    shiftEndTime: {
      type: String,
      required: true,
      default: "18:00",
    },
    address: {
      type: String,
      required: true,
    },
    weekOff: {
      type: String,
      enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      required: true,
      default: "Sunday",
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

export default User;
