import mongoose, { Schema } from "mongoose";

const shopScheama = new mongoose.Schema(
  {
    business_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    shopName: {
      type: String,
      // required: true,
    },
    username: {
      type: String,
      // required: false,
      default: "",
    },
    media: {
      thumbnail: {
        type: String,
        required: false,
      },
      gallery: {
        e2: { type: String },
        f1: { type: String },
        f2: { type: String },
      },
    },
    about: {
      type: String,
      // required: true,
    },
    categoryTitle: {
      type: String,
      // required: true,
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
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "review",
      },
    ],
    ratings: {
      type: Number,
      // required: false,
      default: 0,
    },
    numOfratings: {
      type: Number,
      // required: false,
      default: 0,
    },
    paymentMethod: {
      type: [String] || String,
      // required: true,
    },
    address: {
      type: String,
    },
    location: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true },
    },
    website: {
      type: String,
      // required: true,
    },
    facebook: {
      type: String,
      // required: true,
    },
    instagram: {
      type: String,
      // required: true,
    },
    weekStart: {
      type: String,
      // required: true,
    },
    weekEnd: {
      type: String,
      // required: true,
    },
    onHour: {
      type: String,
      // required: true,
    },
    offHour: {
      type: String,
      // required: true,
    },
    cancelPolicy: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
shopScheama.index({ location: '2dsphere' });

export default mongoose.model("shop", shopScheama);
