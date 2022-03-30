const mongoose = require("mongoose");

const checkOutSchema = new mongoose.Schema({
  retailer: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  priceTotal: {
    type: Number,
    required: true
  }
});

const CheckOut = mongoose.model("Checkout", checkOutSchema);

module.exports = {
  schema: checkOutSchema,
  model: CheckOut
};
