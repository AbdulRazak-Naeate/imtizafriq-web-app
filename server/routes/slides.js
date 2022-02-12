const express = require('express');
const router = express.Router();
const Slides= require('../models/Slides');
const {uploadImage}   = require('../upload');

//post new slides
router.post('/',uploadImage('./server/uploads/slides'), async(req,res) =>{
       try{
      
    
        const subscriber= new Slides({images:req.body.images});
        const slides= await subscriber.save();
        res.json({data:slides});
              
       }catch(err){
           console.log(err)
       }
});

//get slides 
router.get('/',async(req,res) => {
    try{
        const subscriber = await Slides.findOne({email:req.params.email})
        res.json({subcriber:subscriber});

    }catch(err){
        console.log(err)
    }
});

module.exports = router;