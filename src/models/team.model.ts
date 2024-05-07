import mongoose, { Schema } from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    picture: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    hourly_rate: {
      type: Number,
      required: true,
    },
    schedule: [
      {
        type: Schema.Types.ObjectId,
        ref: "schedule",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("team", teamSchema);
