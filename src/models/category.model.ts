import mongoose from "mongoose";

const categoryScheama = new mongoose.Schema(
  {
    label: {
      type: String,
      require: true,
    },
    value: {
      type: String,
      require: true,
    },
    // user:{
    //     ref:ddd
    // },

    // business:{
    //     ref:ddd
    // }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Category", categoryScheama);
