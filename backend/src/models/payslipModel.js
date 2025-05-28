import mongoose from "mongoose";
const payslipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    month: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    totalWorkingDays: {
      type: Number,
      required: true,
    },
    totalPresentDays: {
      type: Number,
      required: true,
    },
    totalAbsentDays: {
      type: Number,
      required: true,
    },
    totalHalfDays: {
      type: Number,
      required: true,
    },
    totalLeaveDays: {
      type: Number,
      required: true,
    },
    totalEarnings: {
      type: Number,
      required: true,
    },
    totalDeductions: {
      type: Number,
      required: true,
    },
    netSalary: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Payslip = mongoose.model("payslip", payslipSchema);

export default Payslip;
