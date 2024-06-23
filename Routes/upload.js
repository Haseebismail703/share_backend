import express from 'express';
import multer from 'multer';
import fs from 'fs-extra';
import cloudinary from 'cloudinary';
import ShareFile from '../models/fileschema.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'image/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.originalname);
  }
});

// Multer instance for upload
const upload = multer({ storage: storage });

// POST route for file upload
router.post('/', upload.single('file'), async function (req, res) {
  // Use fs-extra to read files from the 'image/' directory
  fs.readdir("image/", async (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Iterate through each file found in the 'image/' directory
    for (const file of files) {
      try {
        // Upload file to Cloudinary
        const result = await cloudinary.v2.uploader.upload(`image/${file}`, {});

        // Save file details to MongoDB using ShareFile model
        const share = new ShareFile({
          ip: req.body.ip, // Assuming req.body.ip contains the IP address
          public_id: result.public_id,
          url: result.url
        });

        const newFile = await share.save();
        console.log('File saved:', newFile);

        // Remove the file from local storage after successful upload
        await fs.remove(`image/${file}`);
      } catch (error) {
        console.error('Error uploading file:', error);
        return res.status(500).json({ error: 'Error uploading file to Cloudinary' });
      }
    }

    // Respond with success message after all files are processed
    return res.status(200).json({ status: 200, message: 'Files uploaded successfully' });
  });
});

export default router;
