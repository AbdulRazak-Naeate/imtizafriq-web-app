const  mongoose =  require('mongoose');
const SubscriberSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,

    }
})

module.exports = mongoose.model('Subscribers',SubscriberSchema);