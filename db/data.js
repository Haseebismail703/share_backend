import mongoose from "mongoose";
import 'dotenv/config'

mongoose.connect(process.env.MONGO_URL)
export default mongoose
