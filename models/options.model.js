const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
    key: { type: String, unique: true },
    value: String,
    softDelete: Boolean
},
    { timestamps: true }
);

const Option = mongoose.model('Option', optionSchema);
module.exports = Option;