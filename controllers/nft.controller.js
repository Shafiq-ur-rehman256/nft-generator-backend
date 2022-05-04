const {nftModel} = require('../models/index');


exports.setInformation = async(req,res)=>{

    const {name,size,width,height,discription,email} = req.body;

    if(!name || !size || !width || !height || !discription || !email){
        return res.send({
            Error: true,
            message: 'something went wrong please refresh page!'
        })
    }

    try {

        const createDoc = await nftModel.create({
            name,
            email,
            size,
            width,
            height,
            discription
        })

        createDoc.save();

        return res.send({
            Error: false,
            message: createDoc
        })
        
    } catch (error) {
        return res.send({
            Error: true,
            message: `internal server error: ${error.message}`
        })
    }
}

exports.setImages = async(req,res)=>{

    let { id, images } = req.body;
    try {

        const setImages = await nftModel.findByIdAndUpdate({_id:id},{
            images:images
        })

        return res.send({
            Error: false,
            message: 'proceed'
        })
        
    } catch (error) {
        return res.send({
            Error: true,
            message: `internal server error:${error.message}`
        })
    }

}