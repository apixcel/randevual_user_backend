import mongoose from "mongoose";

const userScheama = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: false,
      default: "",
    },
    lastname: {
      type: String,
      required: false,
      default: "",
    },
    username: {
      type: String,
      required: false,
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
    password:{
      type: String,
      required: true,
    },
    picture: {
      type: String,
      require: false,
      default: ""
    },
    phone: {
      type: String,
      require: false,
      default: ""
    },
    status: {
      type: String,
      default: "unverified",
    },
    user_type: {
      type: String,
      default: "regular",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("user", userScheama);
