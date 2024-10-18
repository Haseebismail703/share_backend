import express from 'express'
const router = express.Router()
import ShareText from '../models/textschema.js'



router.post('/',async(req, res) => {
    // console.log(req.body.id , req.body.text )

    const filter = { _id : req.body.id  }
    ShareText.findOneAndUpdate(filter, {text :req.body.text })
    .then(updatedDoc => {
        if (updatedDoc) {
           res.status(200).send({_id :updatedDoc._id})
            // console.log(`Updated document with _id: ${updatedDoc._id}`);
        } else {
            res.status(404).send({_id :req.body._id})
            console.log(`No user found with ID: ${req.body._id}`)
        }
    })
    .catch(err => {
        console.error(err);
    });
})
export default router 