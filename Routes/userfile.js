import express from "express";
import  File  from "../models/fileschema.js";
import {ip} from '../ipadd/ipadd.js'
const router = express.Router()

router.get('/', async (req, res) => {
  console.log(req.body)
  try {
    const ip_add = await ip()
    console.log(ip_add);
    const file =  await  File.find({ip : ip_add })
    res.status(200).send({FileData : file })
  } catch (error) {
    res.status(500).send({Error :error.Message})
  }
    
  })
export default router