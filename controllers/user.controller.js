const {userModel} = require('../models/index');
const bcrypt = require('bcrypt');
const randomString = require('randomstring');
const jwt = require('jsonwebtoken');
const {config} = require('../config/index');
const {sendMail} = require('../utils/nodemailer');

exports.signup = async(req, res)=>{
    const { username, email ,password } = req.body;

    if(!username || !email || !password){
        return res.send({
            Error: true,
            message: 'please provide all require fields!'
        })
    }

    try {
        const isUser = await userModel.findOne({email}).exec();
        if(isUser){
            return res.send({
                Error: true,
                message: 'User already created by this email!'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const accountId = randomString.generate({
            length: 12,
            charset: 'numeric'
          })

        const createUser = await userModel.create({
            username: username,
            email: email,
            password: hashPassword,
            accountId: accountId
        });

        createUser.save();

        return res.send({
            Error: false,
            message: 'user created successfully'
        })

    } catch (error) {
        return res.send({
            Error: true,
            message: `internal server error: ${error.message}`
        })
    }
}

exports.login = async(req,res)=>{

    const {email , password} = req.body

    if(!email || !password){
        return res.send({
            Error: true,
            message: 'Credentials not match'
        })
    }

    try {

        const findUser = await userModel.findOne({email:email});

        if(!findUser){
            return res.send({
                Error: true,
                message: 'email or password is invalid!'
            })
        }

        const isMatch = await bcrypt.compare(password,findUser.password);

        if(!isMatch){
            return res.send({
                Error: true,
                message: 'email or password is invalid!'
            })
        }

        const payload = {
            email: findUser.email,
            id: findUser._id,
        }

        const token = jwt.sign(payload, config.jwt_secret,{
            expiresIn: '2d'
        } );

        return res.send({
            Error: false,
            message: {
                username: findUser.username,
                email: findUser.email,
                accountId: findUser.accountId,
                Id: findUser._id,
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

exports.requestOtp = async(req,res) =>{

    const {email} = req.body;

    if(!email){
        return res.send({
            Error: true,
            message: 'please Provide email!'
        })
    }

    try {

        const validEmail = await userModel.findOne({email}).exec();
        
        if(!validEmail){
            return res.send({
                Error: true,
                message: 'invalid email or user not found'
            })
        }

        const otp = randomString.generate({
            length: 5,
            charset: 'alphanumeric'
        })


        const setOtp = await userModel.findOneAndUpdate({email},{
            otp: otp,
            otpExpiry: new Date(+new Date() + 300000)
        })

        const mailData = {
            from: 'ahmedshafiq012@gmail.com',
            to: validEmail.email,
            subject: 'Your recovery code',
            text: otp,
        }

        sendMail(mailData);

        return res.send({
            Error: false,
            message: 'email has been sent to your email'
        })

    } catch (error) {
        return res.send({
            Error: true,
            message: `internal server error: ${error.message}`
        })
    }
}