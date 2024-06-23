import express from "express";
import  Text  from "../models/textschema.js";
const router = express.Router()



router.get('/', async (req, res) => {

  try {
    // const text =  await Text.find()
    // console.log(text)
    res.status(200).send({Message :"Not allowed"})
  } catch (error) {
    res.status(500).send({Message : error.Message})
  }
  })


router.get('/:ip',async(req,res)=>{
  
 try {
  const text =  await Text.find({ip : req.params.ip })
  console.log(req.params.ip)
  res.status(200).send({text : text })
 } catch (error) {
  console.log(error)
  res.status(500).send({Message : error.Message})
 }
})





  router.post('/del',async(req,res)=>{
    // console.log(req.body)
    try {
    const {_id} = req.body
    const result = await Text.findByIdAndDelete(_id)  
    } catch (error) {
        console.log(error) 
        res.status(500).send({Message : error.Message})  
    }
    

})



export default router