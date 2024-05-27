import mongoose from "mongoose";

const connectedAccountSchema = new mongoose.Schema(
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
    accountId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("connectedAccount", connectedAccountSchema);
