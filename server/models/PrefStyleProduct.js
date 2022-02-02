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
        default:'none',
        required:false
    },
    price:{
        type:Number,
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
    product_type:{
        type:String,
        default:'special'
    },
    date:{
        type:String,
        default:Date.now()
    },
   
    


 }).index({name:"text",description:"text"});

 module.exports = mongoose.model('PrefStyleProduct',ProductSchema);
 