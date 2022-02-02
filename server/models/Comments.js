const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    username:{
    type:String,
    require:true,
    },
    text:{
        type:String,
        require:true,
        default:'mock comments',
    },  
     productid:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Comments',CommentsSchema)

