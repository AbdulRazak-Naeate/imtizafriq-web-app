const express = require('express');
const router = express.Router();
const Subscribers= require('../models/Subscribers');

//post new subscriber
router.post('/:email', async(req,res) =>{
    //check if already subscribe
       try{
        const alreadySubscribe = await Subscribers.findOne({email:req.params.email});
        if (alreadySubscribe) return res.json('already subscribe').status(400);
    
        const subscriber= new Subscribers({email:req.params.email});
        const savedSubscriber= await subscriber.save();
        res.json({data:savedSubscriber});
              
       }catch(err){
           console.log(err)
       }
});

//find a subscriber 
router.get('/:email',async(req,res) => {
    try{
        const subscriber = await Subscribers.findOne({email:req.params.email})
        res.json({subcriber:subscriber});

    }catch(err){
        console.log(err)
    }
});

module.exports = router;