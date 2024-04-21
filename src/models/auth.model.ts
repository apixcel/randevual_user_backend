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
      unique: true,
      required: false,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      required: false,
      default: "",
      unique: true,
      lowercase: true,
    },
    address: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "unverified",
    },
    user_type: {
      type: String,
      default: "regular",
    },
    avatar: {
      public_id: {
        type: String,
        default: null,
      },
      url: {
        type: String,
        default: null,
      },
    },
    hashed_password: {
      type: String,
      required: false,
      select: false,
      default: "",
    },
    salt: {
      type: String,
      select: false,
      default: "",
    },
    resetPasswordLink: {
      data: {
        type: String,
        select: false,
        default: "",
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userScheama);
