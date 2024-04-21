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
