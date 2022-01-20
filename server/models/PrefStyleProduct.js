const mongoose = require('mongoose');


 const ProductSchema = new mongoose.Schema({
     name:{
         type:String,
         required:true
     },
     description:{
        type:String,
        required:false
    },
    specification:{
        type:String,
        required:'none'
    },
    price:{
        type:Number,
        required:false
    },
    storeId:{
        type:String,
        required:false
    },
    image:{
        type:Object
    },
    color:{
        type:Array
    },
    size:{
        type:Array
    },
    date:{
        type:String,
        default:Date.now()
    },
   
    


 }).index({name:"text",description:"text"});

 module.exports = mongoose.model('PrefStyleProduct',ProductSchema);
 