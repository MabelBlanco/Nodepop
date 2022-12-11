const mongoose = require("mongoose");

const advertisementSchema = mongoose.Schema({
  name: { type: String, required: true },
  sale: { type: Boolean, required: true },
  price: { type: Number, required: true },
  photo: String,
  tags: { type: [String], required: true },
});

const Advertisement = mongoose.model("Advertisement", advertisementSchema);

module.exports = Advertisement;
