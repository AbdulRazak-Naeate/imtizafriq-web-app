const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
    productId:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    product:{
        type:Object,
        rewuired:true
    },

    date:{
        type:Date,
        default:Date.now()
    }

});

module.exports= mongoose.model('Cart',CartSchema);