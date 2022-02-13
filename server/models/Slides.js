const mongoose = require('mongoose');

const SlidesSchema = new mongoose.Schema({
     image:{
         type:Object
    }
})

module.exports = mongoose.model('Slides',SlidesSchema);