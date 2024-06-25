import express from 'express'
let router = express.Router()
import File from '../models/fileschema.js'
import cloudinary from 'cloudinary'
cloudinary.config({
    cloud_name: 'dmlk41njm',
    api_key: '622964139729985',
    api_secret: 'VfWsvE8NHNpfdYgpMqAhVf9qppw'
  });
router.post('/',async(req,res)=>{
    // console.log(ip.address())
    try {
    const {_id,public_id} = req.body
    const result = await File.findByIdAndDelete(_id)
    cloudinary.v2.api
    .delete_resources([public_id], 
        { type: 'upload', resource_type: 'image' })
       
    } catch (error) {
        console.log(error) 
        res.status(500).send({Message : error.Message})  
    }
    

})
export default router