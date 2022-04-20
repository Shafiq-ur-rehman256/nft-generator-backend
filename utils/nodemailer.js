const nodemailer = require('nodemailer');
const {config} = require('../config/index');


const mailTransporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: 'ahmedshafiq012@gmail.com',
        pass: config.google_secret
    }
})

exports.sendMail = async(option) =>{
    mailTransporter.sendMail(option,(err,data)=>{
        if(err){
            console.log('unable to send mail');
        }else{
            console.log('code sent successfully');
        }
    })
}