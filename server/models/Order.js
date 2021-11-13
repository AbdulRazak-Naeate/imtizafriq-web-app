const mongoose = require('mongoose');


const OrderSchema  =  new mongoose.Schema({
     name:{
         type:String,
         required:true
     },
     storeId:{
         type:String,
         required:true
     },
     productId:{
        type:String,
        required:true
    },
    orderNumber:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    color:{
        type:String
    },
    size:{
        type:String,
    },
    priceEach:{
        type:Number,
        required:true
    },
    totalPrice:{
        type:Number,
        required:true,
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
        default:"Pending"
    },
    paymentMethod:{
        type:String,
        required:true
    },
    user:{
        type:Object(),
        default:{"_id":"61782f2f391d5d0cd0c7af3b",
                "username":"AbdulRazakNaeate",
                "firstname":"Abdul Razak",
                "lastname":"Abubakari",
                "phone":" 233548496121",
                }
    }

}); 

module.exports=mongoose.model('Order',OrderSchema);
