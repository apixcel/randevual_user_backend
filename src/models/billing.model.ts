import mongoose from "mongoose";

const billingScheama = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      default: "",
      unique: true,
      lowercase: true,
    },
    customerId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("billing", billingScheama);
