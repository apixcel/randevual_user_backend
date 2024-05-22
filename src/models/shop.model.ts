import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

interface IShop extends Document {
  business_id: Schema.Types.ObjectId;
  shopName: string;
  username: string;
  media: {
    thumbnail: string;
    gallery: {
      e2: string;
      f1: string;
      f2: string;
    };
  };
  about: string;
  categoryTitle: string;
  categories: Schema.Types.ObjectId[];
  services: Schema.Types.ObjectId[];
  team: Schema.Types.ObjectId[];
  reviews: Schema.Types.ObjectId[];
  ratings: number;
  numOfratings: number;
  paymentMethod: string;
  address: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  website: string;
  facebook: string;
  instagram: string;
  weekStart: string;
  weekEnd: string;
  onHour: string;
  offHour: string;
  cancelPolicy: string;
  completion: number;
  calculateCompletion(): number;
}

const shopSchema = new mongoose.Schema<IShop>(
  {
    business_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    shopName: {
      type: String,
      // required: true,
      default: "",
    },
    username: {
      type: String,
      // required: false,
      default: "",
    },
    media: {
      thumbnail: {
        type: String,
        required: false,
      },
      gallery: {
        e2: { type: String },
        f1: { type: String },
        f2: { type: String },
      },
    },
    about: {
      type: String,
      // required: true,
      default: "",
    },
    categoryTitle: {
      type: String,
      // required: true,
      default: "",
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "category",
      },
    ],
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "service",
      },
    ],
    team: [
      {
        type: Schema.Types.ObjectId,
        ref: "team",
      },
    ],
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "review",
      },
    ],
    ratings: {
      type: Number,
      // required: false,
      default: 0,
    },
    numOfratings: {
      type: Number,
      // required: false,
      default: 0,
    },
    paymentMethod: {
      type: String,
      // required: true,
      default: "",
    },
    address: {
      type: String,
    },
    location: {
      type: { type: String, enum: ["Point"], required: false },
      coordinates: { type: [Number], required: false },
    },
    website: {
      type: String,
      // required: true,
      default: "",
    },
    facebook: {
      type: String,
      // required: true,
      default: "",
    },
    instagram: {
      type: String,
      // required: true,
      default: "",
    },
    weekStart: {
      type: String,
      // required: true,
      default: "",
    },
    weekEnd: {
      type: String,
      // required: true,
      default: "",
    },
    onHour: {
      type: String,
      // required: true,
      default: "",
    },
    offHour: {
      type: String,
      // required: true,
      default: "",
    },
    cancelPolicy: {
      type: String,
      // required: true,
      default: "",
    },
    completion: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

shopSchema.index({ location: "2dsphere" });

// Method to calculate profile completion percentage
shopSchema.methods.calculateCompletion = function () {
  const fieldsToCheck = [
    "shopName",
    "username",
    "media.thumbnail",
    "media.gallery.e2",
    "media.gallery.f1",
    "media.gallery.f2",
    "about",
    "categoryTitle",
    "categories",
    "services",
    "team",
    "cancelPolicy",
    "offHour",
    "username",
    "paymentMethod",
    "address",
    "website",
    "facebook",
    "instagram",
    "weekStart",
    "weekEnd",
    "onHour",
    "offHour",
    "cancelPolicy",
  ];
  /*
     categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "category",
      },
    ],
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "service",
      },
    ],
    team: [
      {
        type: Schema.Types.ObjectId,
        ref: "team",
      },
    ],

  location: {
      type: { type: String, enum: ["Point"], required: false },
      coordinates: { type: [Number], required: false },
    },
  */

  let filledFieldsCount = 0;

  fieldsToCheck.forEach((field) => {
    if (field === "location") {
      if (
        this.location &&
        this.location.type &&
        this.location.coordinates &&
        this.location.coordinates.length === 2
      ) {
        filledFieldsCount++;
      }
    } else {
      const fieldValue = this[field];

      if (Array.isArray(fieldValue)) {
        if (fieldValue.length > 0) {
          filledFieldsCount++;
        }
      } else {
        if (fieldValue && fieldValue.trim() !== "") {
          filledFieldsCount++;
        }
      }
    }
  });

  return Math.round((filledFieldsCount / fieldsToCheck.length) * 100);
};

// Middleware to update completion percentage before saving
shopSchema.pre("save", function (next) {
  this.completion = this.calculateCompletion();
  next();
});

export default mongoose.model<IShop>("shop", shopSchema);

// location: {
//   type: "Point",
//   coordinates: [-73.987501, 40.748817]
// },
