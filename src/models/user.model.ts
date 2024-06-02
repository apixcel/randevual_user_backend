import mongoose from "mongoose";

const userScheama = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      default: "",
    },
    lastname: {
      type: String,
      required: true,
      default: "",
    },

    email: {
      type: String,
      trim: true,
      required: true,
      default: "",
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: false,
      default: "",
    },
    phone: {
      type: String,
      required: true,
      default: "",
    },
    country: {
      type: String,
      required: false,
      default: "",
    },
    timeZone: { type: String, required: false, default: "" },
    currency: { type: String, required: false, default: "" },
    language: { type: String, required: false, default: "" },
    status: {
      type: String,
      default: "unverified",
    },
    user_type: {
      type: String,
      enum: ["regular", "business"],
      default: "regular",
    },
    stripeCustomerId: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("user", userScheama);
