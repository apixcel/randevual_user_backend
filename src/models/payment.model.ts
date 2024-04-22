import mongoose from "mongoose";

const paymentScheama = new mongoose.Schema(
  {
   
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

export default mongoose.model("payment", paymentScheama);
