import express, { Router } from 'express'
import multer from 'multer';
import cloudinary from 'cloudinary'
import File from '../models/fileschema.js';
cloudinary.config({
  cloud_name: 'dmlk41njm',
  api_key: '622964139729985',
  api_secret: 'VfWsvE8NHNpfdYgpMqAhVf9qppw'
});

const router = express.Router()
const storage = multer.diskStorage({});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB file size limit
});


router.post('/', upload.single('file'), async (req, res) => {

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    res.status(200).send({ Message: 'Image uploade succes' })
    // console.log(result.url)
    const file = await new File({
      url: result.url,
      ip: req.body.ip,
      public_id: result.public_id
    })
    const newfile = await file.save()

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' })
  }
});


export default router