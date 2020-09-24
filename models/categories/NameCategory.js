const mongoose = require("mongoose");
const { Schema } = mongoose;

const NameCategorySchema = new Schema({
    NameCategory: {
        type: String,
        required: true,
        trim: true,
    },
    ID: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("NameCategory", NameCategorySchema);
