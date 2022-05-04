const {userRoute} = require('./user.routes');
const {googleAuth2Routes} = require('./google.auth2.routes');
const {nftRoute} = require('./nft.routes')
module.exports = [userRoute, googleAuth2Routes, nftRoute];