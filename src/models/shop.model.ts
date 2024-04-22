import mongoose from "mongoose";

const shopScheama = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    media: {
      thamnail: {
        type: String,
        required: true,
      },
      gallery: {
        e2: { type: String, required: true },
        f1: { type: String, required: true },
        f2: { type: String, required: true },
      },
    },
    bio: {
      type: String,
      require: true,
    },
    categoryTitle: {
      type: String,
      require: true,
    },
    categories: {
      type: Array,
      require: true,
    },
    paymentMethod: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    website: {
      type: String,
      require: true,
    },
    facebook: {
      type: String,
      require: true,
    },
    instagram: {
      type: String,
      require: true,
    },
    weekStart: {
      type: String,
      require: true,
    },
    onHour: {
      type: String,
      require: true,
    },
    offHour: {
      type: String,
      require: true,
    },
    cancelPolicy: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("shop", shopScheama);
