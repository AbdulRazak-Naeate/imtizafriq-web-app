var bodyParser = require('body-parser')
const express = require('express');
const pino = require('express-pino-logger')();
const mongoose = require('mongoose');
require('dotenv/config');

const dotenv = require('dotenv');
const app = express();
const cors = require('cors');
const path = require('path');

const whitelist = ['http://localhost:3000', 'http://localhost:8080', 'https://imtiz.herokuapp.com'];

const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
//MiddleWare
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors(corsOptions)); // package to allow connections from outisde domains
app.use(pino);
//Import Routes
const productsRoute     = require('./routes/products');
const prefarestyleProductRoute= require('./routes/prefarestyle');
const userRoute         = require('./routes/auth');
const categoryRoute     = require('./routes/categories');
const orders            = require('./routes/orders');
const cartRoute         = require('./routes/carts');
const fwverifyRoute     = require('./routes/fwVerify');
const emailRoute        = require('./routes/email/email');
const productlikeRoute  = require('./routes/productlikers');
const subscribeRoute    = require('./routes/subscribers');
const commentsRoute     = require('./routes/comments');
const slidesRoute       = require('./routes/slides');
const analytics         = require('./routes/analytics');
const countries         = require('./routes/world/countries');
const states            = require('./routes/world/states');
const cities            = require('./routes/world/cities');
const sociallinksRoute  = require('./routes/socialmedialinks');
const contactsRoute     = require('./routes/contacts');
dotenv.config();



// This endpoint is pinged every 5 mins by uptimerobot.com to prevent 
// free services like Heroku and Now.sh from letting the app go to sleep.
// This endpoint is also pinged every time the client starts in the 
// componentDidMount of App.js. Once the app is confirmed to be up, we allow 
// the user to perform actions on the client.
app.get('/wake-up', (req, res) => res.json('👌'))

//Route MiddleWares
app.use(express.static('public'));
app.use('/server/uploads',express.static('./server/uploads'));//making uploads folder accessible
app.use('/api/user',    userRoute);
app.use('/api/products',productsRoute);
app.use('/api/prefarestyle',prefarestyleProductRoute);
app.use('/api/category', categoryRoute);
app.use('/api/orders',orders);
app.use('/api/carts',cartRoute);
app.use('/api/verifypayment',fwverifyRoute);
app.use('/api/email',emailRoute);
app.use('/api/productlikes',productlikeRoute);
app.use('/api/subscribe',subscribeRoute);
app.use('/api/comments',commentsRoute,);
app.use('/api/slides',slidesRoute);
app.use('/api/analytics',analytics);
app.use('/api/countries',countries);
app.use('/api/states',states);
app.use('/api/cities',cities);
app.use('/api/socialmedialinks',sociallinksRoute)
app.use('/api/contacts',contactsRoute);

/* //Home Routes
 app.get('/',(req,res)=>{
     res.send('IntizAfriq Web App  version 0.1')
 }) */
const options={ useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex:true,useFindAndModify:false }
//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, options)

    const db = mongoose.connection
    db.once('open', _ =>{
         console.log('Database connected : ')
    })  
    db.on('error',err =>{
        console.error('connection eror:',err)
     })
     if (process.env.NODE_ENV  === 'production') {
        // Serve any static files
        app.use(express.static(path.resolve(__dirname, '../client/build')));
      // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
          res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
        });
      }  
//Start lestening to the server
app.set('PORT',  process.env.PORT || 3001);

app.listen(app.get('PORT'),() => {
    console.log(`Server is running on ${app.get('PORT')}`);
});