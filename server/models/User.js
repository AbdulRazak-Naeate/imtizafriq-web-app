const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:6,
        max:255

    },
    fullname:{
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
     location:{
        type:String,
        required:false,
        max:50,
        default:''
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