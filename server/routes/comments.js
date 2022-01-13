const express   = require('express');
const router    =  express.Router();
const Comments  = require('../models/Comments');


//post new Comments

router.post('/', async (req,res)=>{
    try{
        const comments = new Comments({text:req.body.text});
        const savedComments = await comments.save();
   
        res.json({comments:savedComments,status:200});
    }catch(err){
        console.log(err)
    }
});

//get comments by productid and storeid

router.get('/',async(req,res)=>{
     try{
        const comments= await Comments.findOne({productid:req.body.productid,storeid:req.body.storeId});
      
        res.json({commets:comments,status:200});
       }catch(err){
           console.log(err);
       }
})

module.exports =router;
