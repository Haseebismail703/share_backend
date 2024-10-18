import express from 'express'
import  ShareText  from '../models/textschema.js'
const router = express.Router()

router.post('/', async (req, res) => {
    // console.log(req.body)
  
    try {
      const text = await new ShareText({ ...req.body })
      const newtext = await text.save()
      // console.log(newtext)
      res.status(200).send({ status: 200, user: req.body })
    } catch (error) {
      console.log(error)
      res.status(401).json({ Message : error })
    }
  
  })

  // router.get('/get', async (req, res) => {
  //   try {
  //       const text =  await  ShareText.findOne({ip : "1232"})
  //       if(!text){
  //           res.status(404).json({ Message : "No text found" })
  //       }
  //       res.status(200).send(text)
  //   } catch (error) {
  //       res.status(400).send({Message : error})
  //   }
    
  // })
export default router