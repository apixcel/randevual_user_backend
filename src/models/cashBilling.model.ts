import mongoose, { Schema } from "mongoose";

const cashbillingScheama = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    amount: {
      type: Number,
      required: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "booking",
    },
    payment: {
      // dont need to send it from client
      required: false,
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

cashbillingScheama.pre("save", function (next) {
  const doc = this;
  doc.payment = "cash";
  next();
});

export default mongoose.model("cashBilling", cashbillingScheama);
