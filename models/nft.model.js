const mongoose = require('mongoose');

const schema = mongoose.Schema;

const nftSchema = new schema({
    name:{
        type: String,
        trim: true
    },
    size: {
        type: String,
        trim: true
    },
    width: {
        type: String,
        trim: true,
    },
    height:{
        type: String,
        trim: true,
    },
    discription:{
        type: String,
        trim: true,
    },
    images:{
        type: Array,
    },
    email:{
        type:String,
        trim:true
    }
},{timestamps:true});

exports.nftModel = mongoose.model('nft',nftSchema);