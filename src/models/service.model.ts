import mongoose, { Schema } from "mongoose";

const optionSchema = new mongoose.Schema({
  cost: {
    type: Number,
    required: true,
  },
  duration: { type: String, required: true },
});

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  option: {
    type: [optionSchema],
  },
  down: {
    type: Number,
    required: false,
    default: 0,
  },
});

const serviceScheama = new mongoose.Schema(
  {
    listName: {
      type: String,
      required: true,
    },
    list: {
      type: [listSchema],
      required: true,
    },
    team_id: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("service", serviceScheama);
