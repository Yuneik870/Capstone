const { url } = require("inspector");
const mongoose = require("mongoose");

const checkOutSchema = new mongoose.Schema({
  image: {
    type: url,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const CheckOut = mongoose.model("Checkout", checkOutSchema);

module.exports = {
  schema: checkOutSchema,
  model: CheckOut
};
