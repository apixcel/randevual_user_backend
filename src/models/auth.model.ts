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
    status: {
      type: String,
      default: "unverified",
    },
    user_type: {
      type: String,
      default: "regular",
    },
    picture: {
      type: String,
      require: false,
      default: ""
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("user", userScheama);
