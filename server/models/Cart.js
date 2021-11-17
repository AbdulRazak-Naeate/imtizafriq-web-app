const mongoose = require('mongoose');


const CartSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    subtotal:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default:Date.now()
    }

});

module.exports= mongoose.model('Cart',CartSchema);