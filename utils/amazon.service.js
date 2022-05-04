const {config} = require('../config/index');
const AWS = require('aws-sdk');
const fs = require('fs');



const s3 = new AWS.S3({
    accessKeyId: config.S3_ACCESS_KEY,
    secretAccessKey: config.S3_SECRET_KEY
});

exports.uploadImage = async(fileName, fileContent) => {

    let base64Data = fileContent.replace(/^data:image\/png;base64,/,"");
    const myBuffer = Buffer.from(base64Data, 'base64');
   
    const params = {
        Bucket: config.S3_BUCKET_NAME,
        Key: fileName,
        Body: myBuffer,
        ContentType: "image/png"
    }
    
    
    let ret = await s3.upload(params).promise();

   return ret;

}