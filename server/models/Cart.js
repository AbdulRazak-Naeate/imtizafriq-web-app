const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    storeId:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    data:{
        type:Object,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }

});

module.exports= mongoose.model('Cart',CartSchema);