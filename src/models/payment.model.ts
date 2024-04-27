import mongoose, { Schema } from "mongoose";

const paymentScheama = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("payment", paymentScheama);
