import mongoose, { Schema } from "mongoose";

const shopScheama = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    media: {
      thumbnail: {
        type: String,
        required: true,
      },
      gallery: {
        e2: { type: String, required: true },
        f1: { type: String, required: true },
        f2: { type: String, required: true },
      },
    },
    about: {
      type: String,
      required: true,
    },
    categoryTitle: {
      type: String,
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "category",
      },
    ],
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "service",
      },
    ],
    team: [
      {
        type: Schema.Types.ObjectId,
        ref: "team",
      },
    ],
    review: [
      {
        type: Schema.Types.ObjectId,
        ref: "review",
      },
    ],
    paymentMethod: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
      required: true,
    },
    instagram: {
      type: String,
      required: true,
    },
    weekStart: {
      type: String,
      required: true,
    },
    weekEnd: {
      type: String,
      required: true,
    },
    onHour: {
      type: String,
      required: true,
    },
    offHour: {
      type: String,
      required: true,
    },
    cancelPolicy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("shop", shopScheama);
