const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    //we want username, email and pw
    // but we will just specify email
    email:{
        type: String,
        required: true,
        unique: true
    }
});

// this is adding unique username and pw field
UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
