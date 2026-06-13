const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
        trim: true
    },
    searchedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('History', historySchema);