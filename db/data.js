import mongoose from "mongoose";


mongoose.connect(process.env.MONGO_URL)
export default mongoose
