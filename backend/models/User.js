const mongoose = require('mongoose');

//? rajout du validator npm install mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//? rajout du validator pour empecher doublon email
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);