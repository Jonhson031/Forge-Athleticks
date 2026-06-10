import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    hex: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
      default: null,
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["men", "women", "unisex", "accessories", "sale", "all"],
      default: "unisex",
    },
    category: {
      type: String,
      trim: true,
      default: "",
    },
    type: {
      type: String,
      trim: true,
      default: "",
    },
    images: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [String],
      default: [],
    },
    colors: {
      type: [colorSchema],
      default: [],
    },
    details: {
      type: [String],
      default: [],
    },
    badge: {
      type: String,
      trim: true,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isSale: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    strict: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
