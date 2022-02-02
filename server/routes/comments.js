const express   = require('express');
const router    =  express.Router();
const Comments  = require('../models/Comments');


//get comments 
router.get('/',async(req,res)=>{
    try{
       const comments= await Comments.find();
     
       res.json({comments:comments,status:200});
      }catch(err){
          console.log(err);
      }
})

//post new Comment

router.post('/', async (req,res)=>{
    try{
        const comments = new Comments({username:req.body.username,text:req.body.text,productid:req.body.productid});
        const savedComments = await comments.save();
   
        res.json({comment:savedComments,status:200});
    }catch(err){
        console.log(err)
    }
});

//get comments by productid

router.get('/:productId',async(req,res)=>{
     try{
         console.log(req.params)
        const comments = await Comments.find({productid:req.params.productId});
        
        res.json({comments:comments,status:200});
       }catch(err){

           console.log(err);
       }
})

module.exports =router;
