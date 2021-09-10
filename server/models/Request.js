const mongoose = require('mongoose');


const RequestSchema  =  new mongoose.Schema({

     storeId:{
         type:String,
         required:true
     },
     productId:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    color:{
        type:String
    },
    size:{
        type:String,
    },
    priceEach:{
        type:String,
        required:true
    },
    totalPrice:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:Date.now()
    },
    status:{
        type:String,
        default:"Requested"
    },
    paymentMethod:{
        type:String,
        required:true
    }

}); 

module.exports=mongoose.model('Request',RequestSchema);
