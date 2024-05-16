import mongoose from "mongoose";

const subscribeScema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      default: "",
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("subscribe", subscribeScema);
