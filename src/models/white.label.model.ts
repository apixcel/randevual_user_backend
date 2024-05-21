import mongoose from "mongoose";

const whiteLabelScheama = new mongoose.Schema(
  {
    shopId: {
      type: String,
      required: true,
      unique: true,
    },
    label_id: {
      type: String,
      required: true,
      unique: true,
    },
    live_url: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["yes", "no"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("whiteLabel", whiteLabelScheama);
