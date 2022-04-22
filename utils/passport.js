const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { config } = require('../config/index');
const {findAndCreateUser} = require('../controllers/googleAuth.controller')


passport.use(new GoogleStrategy({
    clientID: config.google_client_id,
    clientSecret: config.google_secret_key,
    callbackURL: config.google_callback_url,
    passReqToCallback: true
}, async(request, accessToken, refreshToken, profile, done) => {

    const {id , name:{familyName}} = profile;
    const email = profile.emails[0]?.value;
    await findAndCreateUser(id , email , familyName)
    return done(null, profile)
}
))

passport.serializeUser((users, done)=>{
    done(null,users)
})

passport.deserializeUser((users, done)=>{
    done(null,users)
})