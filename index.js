import express from 'express';
import cors from 'cors';
import chalk from 'chalk'
import main from './Routes/main.js';
import mongoose from './db/data.js';

const app = express();
const PORT = 5000  ;

const db = mongoose.connection
db.on('error',console.error.bind(console,'Error connection'))
db.once('open',()=>{
    console.log(chalk.green('Db connected'));
})


app.use(express.json());
app.use(cors())

// app.use(expressIp().getIpInfo())
app.use(cors({
  origin: 'http://localhost:5173/',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

 
app.use('/api', main);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});