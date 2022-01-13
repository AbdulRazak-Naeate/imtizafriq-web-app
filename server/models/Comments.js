const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    productId:{
        type:String,
        require:true,
    },
    storeId:{
        type:String,
        require:true,
    },
    text:{
        type:String,
        require:true,
        default:'mock comments',
    },
    date:{
        type:Date,
        default: Date().now()
    }
});

module.exports = mongoose.model('Comments',CommentsSchema)

