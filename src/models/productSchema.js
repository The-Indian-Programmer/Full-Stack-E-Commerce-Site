const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalprice: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    rating: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    reviews: {
      type: Array,
      required: true,
    },
    questions: {
      type: Array,
      required: true,
    },
    inStock: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      required: true,
    },
    checked: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productSchema =
  mongoose.models.products || mongoose.model("products", Schema);
export default productSchema;
