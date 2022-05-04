const express = require('express');
const { uploadImage } = require('../utils/amazon.service');
const {setInformation, setImages} = require('../controllers/nft.controller');

const app = express();

const router = express.Router();

router.post('/upload', async (req, res) => {
    let { filename, content } = req.body;
    const reuslt = await uploadImage(filename, content);
    return res.send({
        Error: false,
        message: reuslt
    })
});

router.post('/set-info', setInformation);

router.post('/set-images', setImages);

exports.nftRoute = app.use('/nft', router);

