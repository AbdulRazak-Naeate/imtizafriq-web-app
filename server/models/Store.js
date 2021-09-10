const mongoose = require('mongoose');


 const StoreSchema = new mongoose.Schema({
     name:{
         type:String,
         required:true
     },
     userId:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },city:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        required:true
    },
    storeCategoryId:{
        type:String,
        required:true
    },
    ghPostGPS :{
        type:String,
        required:false,
    },
    date:{
        type:String,
        default:Date.now()
    },
       validStatus:{
        type:String,
        default:'NOT_VALID'
    },


 });

 module.exports = mongoose.model('Store',StoreSchema);
 