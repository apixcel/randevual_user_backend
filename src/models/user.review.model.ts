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
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("review", reviewScheama);
