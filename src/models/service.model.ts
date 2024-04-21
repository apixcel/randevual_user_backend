import mongoose from "mongoose";

const serviceScheama = new mongoose.Schema(
  {
    listName: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    }
    // shop:{
    //     ref:ddd
    // }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Service", serviceScheama);
