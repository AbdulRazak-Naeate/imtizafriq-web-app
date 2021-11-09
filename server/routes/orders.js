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
  
    const ordernum=UniqueOrderNumber();
      const order = new Order({
          name:req.body.name,
          storeId:storeId,
          productId:req.body.productId,
          orderNumber:ordernum,
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
       const updateOrder = await Order.findOneAndUpdate(
           {_id: oId},
           {
            $set:{status:req.body.status},
           },
           {new:true,useFindAndModify:false}
           );

           res.json({data:updateOrder,status:200});
   }catch(err){
       res.json({message:err});
   }
});

//update many order
router.patch('/many/:ids',async (req,res)=> {
    try{
        //console.log(req.body.ids)
        var _ids=JSON.parse(req.body.ids);
       
         await Order.updateMany(
            {
                _id: {  $in:_ids}
            },
            {
             $set:{status:req.body.status},
            }
            ).then(ret=>{
                console.log(ret)
                res.json({data:ret,statusString:req.body.status,status:200});
            });
 
           
    }catch(err){
        res.json({message:err});
    }
 });


/* const orderNumber =()=>{
   var min=10000;
   var max=90000;

   var orderNumber=Math.floor(Math.random()*min)+max;

   return orderNumber;
} */

const UniqueOrderNumber= ()=> {//Unique Identifier
    var result           = '';
   // var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var characters       = '0123456789';

    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result);
    return result;
  }

module.exports = router;