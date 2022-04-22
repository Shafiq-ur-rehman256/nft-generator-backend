const {userRoute} = require('./user.routes');
const {googleAuth2Routes} = require('./google.auth2.routes');

module.exports = [userRoute, googleAuth2Routes];