import mongoose from "mongoose";

const bookingScheama = new mongoose.Schema(
  {
    list: {
      type: Array,
      required: true,
    },
    date: {
      type: String,
      require: true,
    },
    time: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    status: {
      type: Number,
      require: true,
      default: 0, // 0=incomming, 1=complete, 2=cancelled
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

export default mongoose.model("Booking", bookingScheama);
