const express = require('express');
const {signup, login, requestOtp} = require('../controllers/user.controller');
const app = express();

const router = express.Router();

router.get('/', (req,res)=>{
    return res.send({
        Error: false,
        message: 'users route works'
    })
})

router.post('/signup',signup);

router.post('/login', login);

router.post('/verify-email', requestOtp);


exports.userRoute = app.use('/user', router)