const express = require('express');
const passport = require('passport')
const { signIn } = require('../controllers/googleAuth.controller');

const app = express();

const router = express.Router();

router.get('/', (req, res) => {
    return res.send({
        Error: false,
        message: 'google auth 2 route works'
    })
});

router.post('/google/signin', signIn);

router.get('/google/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.send({
        Error: false,
        message: 'logging out...!'
    });
    })

router.get('/google/success', (req, res) => {

    return res.redirect(`http://localhost:4200/login?id=${req.user.id}`)
})

router.get('/google/failed', (req, res) => {
    return res.redirect('http://localhost:4200?id=null')
})

router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: 'http://localhost:3040/api/v1/auth/google/success',
    failureRedirect: 'http://localhost:3040/api/v1/auth/google//failed'
}))


exports.googleAuth2Routes = app.use('/auth', router)
