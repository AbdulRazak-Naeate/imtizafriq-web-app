const express= require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Order= require('../models/Order');
const Store  =  require('../models/Store');
const verify = require('../routes/verifyToken');
const {orderValidation} = require('../validation');



//get all Orders
router.get('/', async(req,res)=>{
      try{
        const orders = await Order.find();
        res.json({orders:orders,status:200});

      }catch(err){
        res.json({message:err})
      }
});

//submit order

router.post('/',verify,async (req,res)=>{
      
    //Validation
    const {error} = orderValidation(req.body);
    //check for errors

    if(error) return res.status(400).send(error.details[0].message);

    const userId = req.user._id; //get userid

    const store = await Store.findOne({userId:userId});//get user Store

    const storeId = store._id; //get user store id

      const order = new Order({
          name:req.body.name,
          storeId:storeId,
          productId:req.body.productId,
          quantity:req.body.quantity,
          color:req.body.color,
          size:req.body.size,
          priceEach:req.body.priceEach,
          totalPrice:req.body.totalPrice,
          userId:userId,
          date:req.body.date,
          status:req.body.status,
          paymentMethod:req.body.paymentMethod
      });

 try{
    const saveOrder = await order.save();

       res.json(saveOrder);

    }catch(err){
     res.json({message:err})
    }
});

//get specific order
router.get('/:orderId', async (req,res)=>{
    try{
        const order = await Order.findById(req.params.orderId);
        res.json(order);
    }catch(err){
        res.json({message:err})
    }
});

//delete Specific order

router.delete('/:orderId', async (req,res)=>{
    try{
         const removeOrder = await Order.remove({_id:req.params.orderId});

         res.json(removeOrder);
    }catch(err){
        res.json({message:err});
    }
});

//update order
router.patch('/:orderId',async (req,res)=> {
   try{
        var oId= new mongoose.Types.ObjectId(req.params.orderId)
       const updateOrder = await Order.updateOne(
           {_id: oId},
           {
            $set:{status:req.body.status},
           });

           res.json(updateOrder);
   }catch(err){
       res.json({message:err});
   }
});

module.exports = router;