const express = require('express');
const router = express.Router();
const Slides= require('../models/Slides');
const {uploadImage}   = require('../upload');
const {updateSlidesImage}   = require('../upload');
const mongoose = require('mongoose');
const fs = require('fs');
const { cloudinary } = require('../cloudinary');

//post new slides
router.post('/', async(req,res) =>{
       try{
         var  position=parseInt(req.body.position);

       //  var file=req.files[0]
       //  console.log(file)
        var size=0;
        const slidesExist = await Slides.findOne({name:req.body.name});
       var image=[];
       var base64encImages=req.body.encodedimages
       
        if (slidesExist){
            
            try {
                
                    const uploadResponse = await cloudinary.uploader.upload(base64encImages, {
                        upload_preset: 'slides',
                    });
                    console.log(uploadResponse);
        
                    image.push(uploadResponse);  // cloudinary image object  
                
               console.log({ urls:image });
            } catch (err) {
                console.error(err);
            }
        
            if (image.length<=0) return res.json({status:400,message:"error uploading images"});
        
        try{
            size = slidesExist.image.length;
        }catch(err){
            console.log(err)
        }
         console.log('position '+ position +' size '+size);
           if (size >= 2){
            await Slides.findOneAndUpdate({name:req.body.name},
                {$set: {
                    [`image.${position}`]: image[0]
                    }},
                {new:true,useFindAndModify:false});
           }else{
           const addSlides = await Slides.findOneAndUpdate({name:req.body.name},
                {$push: {image:image[0]}},
                {new:true,useFindAndModify:false});

                res.json({slides:addSlides});

           }
        } else{
            var s=image[0];
            console.log(s)
            const slides= new Slides({image:[s],name:req.body.name});
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

router.post('/deleteslide',async(req,res)=>{

    var position=req.body.position
    var image=req.body.image
    var public_id=image.public_id
    console.log(position +' '+public_id)

    const updateSlide = await Slides.findOneAndUpdate({name:req.body.name},
       {
          $pull:{image:{public_id:public_id}}

      }, { new:true,useFindAndModify:false}
    
        );

    if (updateSlide){
      try{
        cloudinary.uploader.destroy(public_id)

        /* fs.unlink('server/uploads/slides/'+filename,(err) =>{
            if(err){
                console.error(err)
                return
            }
        }); */
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