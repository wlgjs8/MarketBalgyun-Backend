const mongoose = require("mongoose");
const { Schema } = mongoose;

const SecondCategorySchema = new Schema({
  SecondCategory: {
    type: String,
    required: true,
    trim: true,
  },
  ID: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("SecondCategory", SecondCategorySchema);
