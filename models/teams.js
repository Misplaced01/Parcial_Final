const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TeamSchema = Schema({
    name: {
        type: String,
        unique: true
    },
    country: {
        type: String,
    },
    technical_director: {
        type: String,
    },
    captain: {
        type: String,
    },
    league: {
        type: String,
    },
    login_count: Number
});

module.exports = mongoose.model("Team", TeamSchema);