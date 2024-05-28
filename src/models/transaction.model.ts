import mongoose, { Schema } from "mongoose";

const transactionScheama = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    amount: {
      type: Number,
      required: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "booking",
    },
    payment: {
      required: true,
      type: String,
      enum: ["credit_card", "cash"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("transaction", transactionScheama);
