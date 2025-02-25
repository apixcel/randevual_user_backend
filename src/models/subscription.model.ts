import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      required: true,
      ref: "user",
    },
    stripeSubscriptionId: {
      type: String,
      required: true,
    },
    stripePaymentMethodId: {
      type: String,
    },
    currentPlanId: {
      type: String,
      required: true,
    },
    subscriptionStatus: {
      type: String,
      required: true,
    },
    subscriptionStartDate: {
      type: Date,
      required: true,
    },
    subscriptionEndDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("subscription", subscriptionSchema);
