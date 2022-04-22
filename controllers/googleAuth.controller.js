const { userModel } = require('../models/index');
const jwt = require('jsonwebtoken');
const {config} = require('../config/index')

exports.findAndCreateUser = async (id, email, username) => {
    if (!id || !email || !username) {
        return null;
    };

    try {

        const findUser = await userModel.findOne({ email: email }).exec();

        if (!findUser) {
            const createUser = await userModel.create({
                email: email,
                accountId: id,
                username: username,
                isGoogleAcc: true
            })

            createUser.save();
        } else {
            return null
        }

    } catch (error) {
        return null
    }
}

exports.signIn = async (req, res) => {
    const { id } = req.body;

    if (!id || id == null) {
        return res.send({
            Error: true,
            message: 'Unable to login with google'
        })
    }
    try {

        const checkUser = await userModel.findOne({accountId: id}).exec();

        if(!checkUser){
            return res.send({
                Error: true,
                message: 'Unable to login with google'
            })
        }

        const payLoad = {
            id: checkUser._id,
            email: checkUser.email
        }

        const token = jwt.sign(payLoad, config.jwt_secret , {
            expiresIn: '2d'
        });

        return res.send({
            Error: false,
            message:{
                username: checkUser.username,
                email: checkUser.email,
                accountId: checkUser.accountId,
                Id: checkUser._id,
                isGoogleAcc: checkUser.isGoogleAcc,
                token
            }  
        })


        
    } catch (error) {
        return res.send({
            Error: true,
            message: `internal server error: ${error.message}`
        })
    }

}