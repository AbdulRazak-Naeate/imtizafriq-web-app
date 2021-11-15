const express = require('express');
const router  = express.Router();
const Cart    = require('../models/Cart');
const mongoose= require('mongoose');

//get all carts

router.get('/', async (req,res)=>{
    try{
          const carts = await Cart.find();
          res.json(carts);
    }catch(error){

        res.json({message:error});
    }
});

// submit a Cart

router.post('/',async (req,res)=>{
    try{
          var oId = mongoose.Types.ObjectId(req.body.productId);
          console.log(req.body.productId)
          var pId =req.body.productId;
         const productAllreadyAdded= await Cart.findOne({productId:req.body.productId});
        if (productAllreadyAdded) {//product Exist increase quantity
            console.log('product exist in cart inc qty')
            const updateCartQuantity =await Cart.findOneAndUpdate(
                {productId:pId},
                {
                    $inc: {'quantity':1}
                },   
               { new:true,useFindAndModify:false}
                
            );
        }else{
             const _cart = new Cart({
            productId:req.body.productId,
            quantity:req.body.quantity,
            userId:req.body.userId,
            product:req.body.product}
            ); 
            const savedCart = await _cart.save();
        }

      const cart = await Cart.find();
      res.json({cart:cart,status:200});

    }catch(error){
       res.json(error);
    }
});

//update cart qty
router.patch('/quantity/:productId',async (req,res)=>{

    try{
        var pId =req.body.productId;
        var value= parseInt(req.body.quantity);
         await Cart.findOneAndUpdate(
            {productId:pId},
            {
                $set:{ quantity:req.body.quantity},
            },   
           { new:true,useFindAndModify:false}
            
        ).then(ret=>{
            //res.json(ret)
        });

     //return the whole cart 
       const cart = await Cart.find();
       res.json({cart:cart,status:200})
    }catch(err){
        console.log(err);
    }

});

router.delete('/:productId',async(req,res)=>{
    var oId = mongoose.Types.ObjectId(req.params.productId);
     try{
           const deletecart= await Cart.deleteOne({productId:req.params.productId})
           const cart =await Cart.find();
            res.json({cart:cart,status:200})
     }catch(errr){
        const deleteFromCart= await Cart.updateOne({
            items:{
                $elemMatch:{productId:req.params.productId}
                 }},{
                     $pull:{items:{productId:req.params.productId}}
                 },{multi:true});

     }
})

module.exports = router;