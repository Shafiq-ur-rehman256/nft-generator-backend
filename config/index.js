require('dotenv').config();

exports.config = {
    mongo_uri: process.env.mongo_uri,
    jwt_secret: process.env.jwt_secret,
    google_secret: process.env.google_app_key
}