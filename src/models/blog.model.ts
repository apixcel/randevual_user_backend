import mongoose from "mongoose";

const blogScheama = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    images: {
      thumbnail: {
        type: String,
        required: true,
      },
      cover: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "randevual",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("blog", blogScheama);
