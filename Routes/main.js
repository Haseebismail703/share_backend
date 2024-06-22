import express from 'express'
import text from './text.js'
import upload from './upload.js'
import userfile from './userfile.js'
import usertext from './usertext.js'
import uptext from './uptext.js'
import filedel from './filedel.js'
const router = express.Router()
router.use('/uptext', uptext)
router.use('/text',text)
router.use('/upload',upload)
router.use('/file',userfile)
router.use('/usertext',usertext)
router.use('/filedel',filedel)
export default router 
