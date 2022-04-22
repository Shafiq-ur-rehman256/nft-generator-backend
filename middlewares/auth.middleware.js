const jwt = require('jsonwebtoken');

const { config } = require('../config');
const {userModel} = require('../models');


exports.authmiddleware = async(req,res, next) =>{

    const { token } = req.body;

    if(!token){
        return res.send({
            Error: true,
            message: 'Session expired, Retry to login!'
        })
    }

    try {
        const decoded = jwt.verify(token, config.jwt_secret);
        const isValidUser = await userModel.findOne({_id:decoded.id}).exec();

        if(!isValidUser){
            return res.send({
                Error: true,
                message: 'Session expired, Retry to login!'
            })
        }else{
            next();
        }

    } catch (error) {
        return res.send({
            Error: true,
            message: `internal server error: ${error.message}`
        })
    }
}
