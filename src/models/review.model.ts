import mongoose from "mongoose";

const reviewScheama = new mongoose.Schema(
  {
    listName: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    }
    // user:{
    //     ref:ddd
    // }
    // shop:{
    //     ref:ddd
    // }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Review", reviewScheama);
