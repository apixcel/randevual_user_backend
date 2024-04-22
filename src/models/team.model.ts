import mongoose, { Schema } from "mongoose";

const teamScheama = new mongoose.Schema(
  {
    pic: {
      type: String,
      required: true,
    },
    teamName: {
      type: String,
      required: true,
    },
    specalist: {
      type: String,
      required: true,
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

export default mongoose.model("team", teamScheama);
