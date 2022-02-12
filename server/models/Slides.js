const mongoose = require('mongoose');

const SlidesSchema = new mongoose.Schema({
     images:{
         type:Array
    }
})

module.exports = mongoose.model('Slides',SlidesSchema);