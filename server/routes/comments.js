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
        const comments = new Comments({username:req.body.username,text:req.body.text,productid:req.body.productid,storeid:req.body.storeid});
        const savedComments = await comments.save();
   
        res.json({comment:savedComments,status:200});
    }catch(err){
        console.log(err)
    }
});

//get comments by productid and storeid

router.get('/:storeId/:productId',async(req,res)=>{
     try{
         console.log(req.params)
        const comments = await Comments.find({storeid:req.params.storeId,productid:req.params.productId});
        
        res.json({comments:comments,status:200});
       }catch(err){

           console.log(err);
       }
})

module.exports =router;
