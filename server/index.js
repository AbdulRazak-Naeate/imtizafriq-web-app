const express = require('express');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');
require('dotenv/config');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
 

//Import Routes
const productsRoute = require('./routes/products');
const userRoute     = require('./routes/auth');
const storeRoute    = require('./routes/stores');
const storeCategory = require('./routes/storecategories');
const requests      = require('./routes/requests');
const carts         = require('./routes/carts');

dotenv.config();
//MiddleWare
app.use(cors()); // package to allow connections from outisde domains
app.use(express.json()); //body-parser alternate
app.use(pino);

//Route MiddleWares
app.use(express.static('public'));
app.use('/server/uploads',express.static('./server/uploads'));//making uploads folder accessible

app.use('/api/user',    userRoute);
app.use('/api/products',productsRoute);
app.use('/api/stores',  storeRoute);
app.use('/api/storecategory', storeCategory);
app.use('/api/requests',requests);
app.use('/api/carts',carts);

//Home Routes
 app.get('/',(req,res)=>{
     res.send('Daabia Web App  version 0.1')
 })

//Connect to DB
mongoose.connect(process.env.DB_COMMUNITY_CON, { useNewUrlParser: true ,useUnifiedTopology: true })

    const db =mongoose.connection
    db.once('open', _ =>{
         console.log('Database connected : ')
    })  
    db.on('error',err =>{
        console.error('connection eror: ',err)
     })

//Start lestening to the server
app.set('PORT',3001 ||process.env.PORT);
app.listen(app.get('PORT'),()=>{
    console.log(`Server is running on ${app.get('PORT')}`);
});