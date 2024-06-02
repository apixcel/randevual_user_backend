import mongoose, { Schema } from "mongoose";

const transactionScheama = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "booking",
    },
    shopId: {
      type: Schema.Types.ObjectId,
      ref: "shop",
    },
    payment: {
      required: true,
      type: String,
      enum: ["cash"],
      default: "cash",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("transaction", transactionScheama);
