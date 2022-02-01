const mongoose = require('mongoose');

const CitiesSchema = new mongoose.Schema({

    id:{
        type:Number,
     },
     name:{
         type:String,
     },
    state_id:{
         type:Number
    },
    state_code:{
        type:String
    },
    state_name:{
        type:String
    },
     country_id:{
        type:Number
    }, 
    country_code:{
        type:String
    }, 
    country_name:{
        type:String
    },
     latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    wikiDataId:{
        type:String
    },
})

module.exports = mongoose.model('Cities',CitiesSchema);