const Mongoose= require ("mongoose");

const RegisterSchema =  Mongoose.Schema({
    name: String,
    country: String,
    technical_director: String,
    captain: String,
    league: String
})

module.exports = Mongoose.model("Register", RegisterSchema);