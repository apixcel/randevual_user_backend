import mongoose, { Schema } from "mongoose";

const reviewScheama = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: "shop",
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("review", reviewScheama);
