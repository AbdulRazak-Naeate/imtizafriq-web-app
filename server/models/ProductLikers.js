const mongoose = require('mongoose');

const ProductLikersSchema = new mongoose.Schema({
    productId:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true
    },
    storeId:{
        type:String,
        require:true,
    }
});

module.exports = mongoose.model('ProductLikers',ProductLikersSchema)