const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:6,
        max:255

    },
    firstname:{
        type:String,
        required:false,
        max:255,
        default:''
    },
    lastname:{
        type:String,
        required:false,
        max:255,
        default:''
    },
    email:{
        type:String,
        required:true,
        min:6,
        max:255
    },
    phone:{
        type:String,
        required:false,
        min:10,
        max:14,
        default:''
    },
     address:{
        type:Object,
        required:false,
        default:{
            country:'',
            state:'',
            city:'',
            area:'',
            
        }
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        required:false
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model('User',userSchema);