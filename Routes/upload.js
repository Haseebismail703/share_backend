import express, { Router } from 'express'
import multer from 'multer';
import cloudinary from 'cloudinary'
import 'dotenv/config'
import File from '../models/fileschema.js';
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

const router = express.Router()

// Multer configuration
const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
});

// Route to handle file upload
router.post('/', upload.single('file'), async (req, res) => {
  // console.log(req.body.ip)
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    } 
    const result = await cloudinary.uploader.upload(req.file.path); 
    res.status(200).send({Message : 'Image uploade succes'})
    // console.log(result.url)
    const file = await new File({url :result.url,
      ip : req.body.ip , 
      public_id : result.public_id
    })
    const newfile = await file.save()
    // console.log(newfile)

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' })
  }
});


export default router