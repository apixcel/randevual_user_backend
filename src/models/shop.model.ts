import mongoose from "mongoose";

const shopScheama = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    images: {
      thamnail: "",
      gallery: {
        e2: "",
        f1: "",
        f2: "",
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
    location: {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Shop", shopScheama);
