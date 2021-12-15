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
    }, 
    expires:{
        type:Date,
        default:function futureDate(params) {
           var datenow= new Date()
           var futureDate = new Date(datenow.setMonth(datenow.getMonth()+1))
          return futureDate.toISOString()
        }
    }

});

module.exports= mongoose.model('Cart',CartSchema);