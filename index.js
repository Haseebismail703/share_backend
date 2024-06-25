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

// var whitelist = ["http://localhost:5173/",'https://6675dce783621ce1f5373a5f--super-moxie-4b5fa7.netlify.app/']
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (whitelist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }
 
app.use('/api', main);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});