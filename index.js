import express from 'express';
import cors from 'cors';
import chalk from 'chalk'
import main from './Routes/main.js';
import mongoose from './db/data.js';
import 'dotenv/config'
const app = express();
const PORT = process.env.PORT || 3000;

const db = mongoose.connection
db.on('error',console.error.bind(console,'Error connection'))
db.once('open',()=>{
    console.log(chalk.green('Db connected'));
})


app.use(express.json())
const corsOptions = {
    origin: 'https://shareforyou.netlify.app', // specify the allowed origin
    methods: 'GET,POST,PUT,DELETE', // specify the allowed methods
    allowedHeaders: 'Content-Type,Authorization', // specify the allowed headers
  };
  
  app.use(cors(corsOptions))




 
app.use('/api', main);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});