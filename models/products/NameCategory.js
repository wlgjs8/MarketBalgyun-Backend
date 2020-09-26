const mongoose = require("mongoose");
const { Schema } = mongoose;

const NameCategorySchema = new Schema({
    NameCategory: {
        type: String,
        required: true,
        trim: true,
    },
    sixID: {
        type: String,
        required: true,
    },
    uniqueID: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("NameCategory", NameCategorySchema);
