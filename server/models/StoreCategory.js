const mongoose = require('mongoose');


 const StoreCategorySchema = new mongoose.Schema({
   name:{
        type:String,
        required:true
    },
     short_code:{
         type:String,
         required:true
     }
    
 });

 module.exports = mongoose.model('StoreCategory',StoreCategorySchema);
 