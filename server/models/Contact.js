const  mongoose = require('mongoose');
 
const Contact = new mongoose.Schema({
    
    contacttype:{
        type:String,
        require:true,
        },
        contacts:{
            type:Object,
            require:true,
        }
})

module.exports = mongoose.model('Contact',Contact);