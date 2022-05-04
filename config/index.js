require('dotenv').config();
// console.log(process.env.google_callback_url);
exports.config = {
    mongo_uri: process.env.mongo_uri,
    jwt_secret: process.env.jwt_secret,
    google_secret: process.env.google_app_key,
    google_client_id: process.env.google_client_id,
    google_secret_key: process.env.google_secret_key,
    google_callback_url: process.env.google_callback_url,
    S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY
}