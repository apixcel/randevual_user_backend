import mongoose, { Schema } from "mongoose";

const teamScheama = new mongoose.Schema(
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
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("team", teamScheama);
