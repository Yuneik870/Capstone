const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: String,
    required: true
  },
  review: {
    type: String,
    required: true
  }
});
