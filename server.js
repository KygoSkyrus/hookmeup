const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');

app.use(express.static('public'));

dotenv.config({ path: './env/config.env' });

app.use(express.json());


app.use(require('./routes/route')); 




const db = process.env.dbURI;
const port = process.env.PORT || 4000;

mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('db connected');
}).catch( err => console.log(err));


app.listen(port, () => console.log(`server is running at ${port}`));