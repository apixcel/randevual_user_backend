import mongoose, { Schema } from "mongoose";

const pricingSchema = new Schema(
  {
    freePlanId: { type: String, required: true },
    basicPlanId: { type: String, required: true },
    premiumPlanId: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("pricing", pricingSchema);
