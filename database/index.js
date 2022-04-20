const mongoose = require('mongoose');
const {config} = require('../config/index');

const conectDatabase = async() =>{
    try {
        await mongoose.connect(config.mongo_uri),
          { useNewUrlParser: true, useUnifiedTopology: true, useCreacteIndex: true };
        console.log("Mongo Db connected sucessfully!");
      } catch (error) {
        console.log(`Unable to connect database: ${error.message}`);
      }
}

module.exports =  {
    conectDatabase
}