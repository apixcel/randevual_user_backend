import mongoose from "mongoose";

const paymentScheama = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("payment", paymentScheama);
