const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    accountId:{
        type: String,
        trim: true
    },
    isGoogleAcc:{
        type: Boolean,
        default: false
    },
    password:{
        type: String,
        trim: true,
        minlength: 6
    },
    otp:{
        type: String,
        trim: true,
        maxlength: 5
    },
    otpExpiry:{
        type: Date,
    }
},{timeseries: true})

exports.userModel = mongoose.model('users', userSchema);