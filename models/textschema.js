import mongoose, { Schema } from "mongoose";


const text = mongoose.Schema({
    ip : {
        type: Schema.Types.String,
        required : true
    },
    text : {
        type : Schema.Types.String,
        required : true ,
    },
    
    
})


const ShareText = mongoose.model('text', text)

export default ShareText
