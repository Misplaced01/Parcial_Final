const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var teamSchema = Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: String,
    technical_director: String,
    captain: {
        type: String,
    },
    league: {
        type: String,
    },
    login_count: Number
}, {
    timestamps: true
});

module.exports = mongoose.model("team", teamSchema);