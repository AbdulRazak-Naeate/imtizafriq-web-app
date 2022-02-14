const express = require('express');
const router = express.Router();
const Slides= require('../models/Slides');
const {uploadImage}   = require('../upload');
const {updateSlidesImage}   = require('../upload');
const mongoose = require('mongoose');
//post new slides
router.post('/',updateSlidesImage('./server/uploads/slides'), async(req,res) =>{
       try{
        var query= {image:req.files };
        var file=req.files[0]
        var size=0;
        const slidesExist = await Slides.findOne({name:req.body.name});
       
       
        if (slidesExist){
            
        try{
            size = slidesExist.image.length;
        }catch(err){
            console.log(err)
        }
         var  position=parseInt(req.body.position);
         console.log('position '+ position +' size '+size);
           if (size >= 2){
            await Slides.findOneAndUpdate({name:req.body.name},
                {$set: {
                    [`image.${position}`]: file
                    }},
                {new:true,useFindAndModify:false});
           }else{
            await Slides.findOneAndUpdate({name:req.body.name},
                {$push: {image:file}},
                {new:true,useFindAndModify:false});
           }
        } else{
            const slides= new Slides({image:req.files,name:req.body.name});
            const saveSlides= await slides.save();
            res.json({slides:saveSlides});
        }   
        
              
       }catch(err){
           console.log(err)
       }
});

//get slides 
router.get('/',async(req,res) => {
    try{
        const slides = await Slides.find()
        res.json({slides:slides});

    }catch(err){
        console.log(err)
    }
});

router.post('/update',uploadImage('./server/uploads/slides'),async(req,res)=>{
    var oId= new mongoose.Types.ObjectId(req.params.userId);
    var query= {image:req.files };
    const slidesExist = await Slides.findOne({name:req.body.name});

    if (slidesExist){

    }else{
         await Slides.findOneAndUpdate({name:req.body.name},
        {$set: query},
        {new:true,useFindAndModify:false}
    );
    }
    
    res.json({message:"Slides images updated",status:200});//returning image not neccesory image already updated on user click

})

module.exports = router;