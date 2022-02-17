const  mongoose = require('mongoose');
 
const Socialmedialinks = new mongoose.Schema({
    linktype:{
        type:String,
        require:true,
        },
        medialinks:{
            type:Object,
            require:true,
        }
})

module.exports = mongoose.model('Socialmedialinks',Socialmedialinks);