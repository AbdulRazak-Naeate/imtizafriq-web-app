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
    }

});

module.exports= mongoose.model('Cart',CartSchema);