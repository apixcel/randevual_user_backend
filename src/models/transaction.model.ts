import mongoose, { Schema } from "mongoose";

const transactionScheama = new mongoose.Schema(
  {
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("transaction", transactionScheama);
