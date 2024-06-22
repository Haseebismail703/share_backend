import express from 'express'
let router = express.Router()
import File from '../models/fileschema.js'
import cloudinary from 'cloudinary'
import 'dotenv/config'
cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
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