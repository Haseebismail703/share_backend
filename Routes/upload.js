import express from 'express'
import multer from 'multer'
import fs from 'fs-extra'
import cloudinary from 'cloudinary'
import ShareFile from '../models/fileschema.js'
import 'dotenv/config'
let router = express.Router()

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()
      * 1E9)

    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


router.post('/', upload.single('file'), function (req, res) {
//  console.log(req.body.ip)
  fs.readdir("image/",(err, files) => {
    files.forEach(file => {
      cloudinary.v2.uploader.upload(`image/${file}`, {},async(error, result) => {
        // console.log(result.url,result.public_id)

        try {
          
          const share = await  new ShareFile({ ip : req.body.ip ,public_id :result.public_id,url : result.url })
          const newtext = await share.save()
          console.log(newtext);
          res.status(200).send({ status: 200, Message: "succes"  })
        } catch (error) {
          console.log(error)
          res.status(401).json({ Message : "error" })
        }

        if (error) {
          res.status(500).send({ error: error })
        }
        fs.remove(`image/${file}`, err => {
          if (err) {console.error(err)}
          // res.status(200).send({ Message: 'Uploaded', url: result.url })
        })
      });
    });
  });

 
})





export default router