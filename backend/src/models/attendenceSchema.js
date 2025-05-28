import mongoose from "mongoose";

const attendenceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Half Day", "Leave"],
      required: true,
    },
    inTime: {
      type: String,
    },
    outTime: {
      type: String,
    },
  },
  { timestamps: true }
);

const Attendence = mongoose.model("attendence", attendenceSchema);

export default Attendence;
