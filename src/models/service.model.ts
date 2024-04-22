import mongoose, { Schema } from "mongoose";

const serviceScheama = new mongoose.Schema(
  {
    listName: {
      type: String,
      required: true,
    },
    list: {
      type: [
        {
          name: { type: String, required: true },
          cost: {
            full: {
              type: Number,
              required: true,
            },
            down: {
              type: Number,
              required: true,
            },
          },
          duration: { type: String, required: true },
        },
      ],
      required: true,
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

export default mongoose.model("service", serviceScheama);
