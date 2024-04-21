import mongoose from "mongoose";

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
    // shop:{
    //     ref:ddd
    // }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Team", teamScheama);
