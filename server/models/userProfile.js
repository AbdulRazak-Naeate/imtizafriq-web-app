const mongoose = require('mongoose');
const Schema =  mongoose.Schema();

const userProfile =  Schema({
     userId:{
         type:String,
         required:true,
        },
     address:{
         type:String,
         required:true,
         },
     city:{
         type:String,
         required:true
     },
     district:{
         type:String,
         required:true
     },
     area:{
         stype:String,
         required:true
     },
     ghanapostgps:{
         type:String,
         required:true
     }


});

module.exports = mongoose.model('userProfile',userProfile);