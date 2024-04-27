import mongoose, { Schema } from "mongoose";

const scheduleScheama = new mongoose.Schema(
  {
    month: {
      type: String,
      required: true,
    },
    date:{
/* array of time in a date */ 
    },

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("schedule", scheduleScheama);
