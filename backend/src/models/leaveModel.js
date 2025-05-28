import mongoose from "mongoose";
const leaveSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    leaveType: {
      type: String,
      enum: [
        "Casual",
        "Sick",
        "Maternity",
        "Paternity",
        "Bereavement",
        "Annual",
      ],
      required: true,
    },
    leaveStartDate: {
      type: String,
      required: true,
    },
    leaveEndDate: {
      type: String,
      required: true,
    },
    leaveStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    leaveReason: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Leave = mongoose.model("leave", leaveSchema);

export default Leave;
