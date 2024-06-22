import mongoose,{Schema} from "mongoose"

const file = mongoose.Schema({
    ip : {
        type: Schema.Types.String,
        required : true
    },
    url : {
        type : Schema.Types.String,
        required : true
    },
    public_id : {
        type : Schema.Types.String,
        required : true
    }
    
    
})

const File = mongoose.model('share', file)
export default File