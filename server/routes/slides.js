const express = require('express');
const router = express.Router();
const Slides= require('../models/Slides');
const {uploadImage}   = require('../upload');
const {updateSlidesImage}   = require('../upload');
const mongoose = require('mongoose');
const fs = require('fs');

//post new slides
router.post('/',updateSlidesImage('./server/uploads/slides'), async(req,res) =>{
       try{
        var query= {image:req.files };
        var  position=parseInt(req.body.position);

        var file=req.files[0]
         console.log(file)
        var size=0;
        const slidesExist = await Slides.findOne({name:req.body.name});
       
       
        if (slidesExist){
            
        try{
            size = slidesExist.image.length;
        }catch(err){
            console.log(err)
        }
         console.log('position '+ position +' size '+size);
           if (size >= 2){
            await Slides.findOneAndUpdate({name:req.body.name},
                {$set: {
                    [`image.${position}`]: file
                    }},
                {new:true,useFindAndModify:false});
           }else{
           const addSlides = await Slides.findOneAndUpdate({name:req.body.name},
                {$push: {image:file}},
                {new:true,useFindAndModify:false});

                res.json({slides:addSlides});

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

router.post('/deleteslide',uploadImage('./server/uploads/slides'),async(req,res)=>{

    var position=req.body.position
    var filename=req.body.filename
    console.log(position +' '+filename)

    const updateSlide = await Slides.findOneAndUpdate({name:req.body.name},
       {
          $pull:{image:{filename:filename}}

      }, { new:true,useFindAndModify:false}
    
        );

    if (updateSlide){
      try{
        fs.unlink('server/uploads/slides/'+filename,(err) =>{
            if(err){
                console.error(err)
                return
            }
        });
      }catch(err){
          console.log(err)
      }
      
    }
    res.json({slides:updateSlide,status:200});

})
 /* {
            $set:{
                'image':{
                    $function:{
                        body:function(image){image.splice(position,1);return image;},
                        args:['$image'],
                        lang:'js'
                    }
                }
            }
            
        } */
module.exports = router