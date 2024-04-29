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
            default:0
          },
        },
      ],
      required: true,
    },
    team_id: {
      type: Schema.Types.ObjectId,
      ref: "team",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("service", serviceScheama);
