import mongoose, { Schema } from "mongoose";

const transactionScheama = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    shop_id: {
      type: Schema.Types.ObjectId,
      ref: "shop",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("transaction", transactionScheama);
