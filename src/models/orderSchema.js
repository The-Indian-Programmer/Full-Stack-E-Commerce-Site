const mongoose = require("mongoose");
const Schema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    useremail: {
      type: String,
      required: true,
    },
    productInfo: {
      type: Array,
      required: true,
    },
    useraddress: {
      type: String,
      required: true,
    },
    usermobile: {
      type: String,
      required: true,
    },
    orderdate: {
      type: Date,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    delivered: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const orderSchema = mongoose.models.orders || mongoose.model("orders", Schema);
export default orderSchema;
