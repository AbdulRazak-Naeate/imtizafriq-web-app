const express = require('express');
const mongoose= require('mongoose');
const ProductLikers = require('../models/ProductLikers');
const router = express.Router();
const {productLikersValidation} =require('../validation');
const Product = require('../models/Product');

router.get('/:email',async(req,res)=>{
   
    const  productLikers = await ProductLikers.find({email:req.body.email,productId:req.body.productId});
          res.json({productLikers:productLikers})

});

router.post('/:productId',async(req,res)=>{
    //validation
    const {error} = productLikersValidation(req.body);
    if (error) return res.json().status(400).send(error.details[0].message);
    let productExist=null;
    let val=0;
    const userAlreadyLikeProduct = await ProductLikers.findOne({email:req.body.email,productId:req.body.productId,storeId:req.body.storeId}
    ).then(ret=>{
          productExist=ret;
        // console.log(ret)

    });

        if (productExist===null){
            val=1;
          try{    
             const productLikers = new ProductLikers({productId:req.body.productId,email:req.body.email,storeId:req.body.storeId});
       
               productLikers.save();   
            /*    res.json({productLikers:productLikers}) */
          updateLikes(req,res,1)

          }catch(err){
        }
       }else{
           console.log('exist remove')
  
             try{
               const removeUserFromPorductLikers = await ProductLikers.findOneAndDelete({productId:req.body.productId,email:req.body.email,storeId:req.body.storeId}).then(ret=>{
                    console.log(ret)
                });

                 updateLikes(req,res,-1)    
                if (removeUserFromPorductLikers){
                    
                }
             }catch(err){

              
             }
        res.json({message:'user already likes ,remove '})

       }
        

       
    });

    const updateLikes = async (req,res,val) =>{
        
       
        var oId= new mongoose.Types.ObjectId(req.body.productId);
       
        const value = parseInt(val);    
         console.log(val);
        const updateProduct = await Product.findOneAndUpdate(
            {_id:oId},
            { 
                $inc: {'likes':val}
             },
             {new:true,useFindAndModify:false}
              
            ).then(ret=>{
                console.log(ret)
            });
            res.json(updateProduct);
       
    }

module.exports = router