import mongoose, { Schema } from "mongoose";

const bookingScheama = new mongoose.Schema(
  {
    list: {
      type: [
        {
          name: { type: String, required: true },
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
            required: true,
          },
        },
      ],
    },
    total: {
      type: Number,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
    time: {
      type: String,
      require: true,
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
    phone: {
      type: String,
      require: true,
    },
    notes: {
      type: String,
      require: true,
    },
    status: {
      type: Number,
      require: true,
      default: 0, // 0=incomming, 1=complete, 2=cancelled
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    shop_id: {
      type: Schema.Types.ObjectId,
      ref: "shop",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("booking", bookingScheama);
