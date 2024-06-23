import express from "express";
import  File  from "../models/fileschema.js";
const router = express.Router()

router.get('/', async (req, res) => {
  console.log(req.body)
  try {
    // const file =  await  File.find().select('-_id','-ip')
    res.status(400).send({Message : 'Not allowed to access data' })
  } catch (error) {
    res.status(500).send({Error :error.Message})
  }
    
  })


  router.get('/:ip',async(req,res)=>{
  
    try {
     const userfile =  await File.find({ip : req.params.ip })
    //  console.log(req.params.ip)
     res.status(200).send({file : userfile })
    } catch (error) {
     console.log(error)
     res.status(400).send({Message : error.Message })
    }
   })
export default router