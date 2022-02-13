const mongoose = require('mongoose');

const SlidesSchema = new mongoose.Schema({
     name:{
        type:String
     },
     image:{
         type:Object
    }
})

module.exports = mongoose.model('Slides',SlidesSchema);