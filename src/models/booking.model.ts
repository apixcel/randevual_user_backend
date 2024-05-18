import mongoose, { Schema } from "mongoose";

const bookingScheama = new mongoose.Schema(
  {
    list: {
      type: [
        {
          name: { type: String, requiredd: true },
          option: {
            type: [
              {
                cost: {
                  type: Number,
                  required: true,
                },
                duration: { type: String, required: true },
              },
            ],
          },
          down: {
            type: Number,
            required: false,
            default: 0,
          },
        },
      ],
    },
    total: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "team",
      default: "any",
    },
    phone: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    visit: {
      type: Boolean,
      required: true,
      default: false,
    },
    payment: {
      type: String,
      required: true,
      default: "cash",
    },
    status: {
      type: Number,
      required: true,
      default: 0, // 0=incomming, 1=complete, 2=cancelled
    },
    shop_id: {
      type: Schema.Types.ObjectId,
      ref: "shop",
      default: "any",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      default: "any",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("booking", bookingScheama);

// Save card info in db and get info and cutt off charge after the completation
