const express= require('express');
const router = express.Router();
const Request= require('../models/Request');
const Store  =  require('../models/Store');
const verify = require('../routes/verifyToken');
const {requestValidation} = require('../validation');



//get all Request
router.get('/', async(req,res)=>{
      try{
        const request = await Request.find();
        res.json(request);

      }catch(err){
        res.json({message:err})
      }
});

//submit request

router.post('/',verify,async (req,res)=>{
      
    //Validation
    const {error} = requestValidation(req.body);
    //check for errors

    if(error) return res.status(400).send(error.details[0].message);

    const userId = req.user._id; //get userid

    const store = await Store.findOne({userId:userId});//get user Store

    const storeId = store._id; //get user store id

      const request = new Request({
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
    const savedRequest = await request.save();

       res.json(savedRequest);

    }catch(err){
     res.json({message:err})
    }
});

//get specific request
router.get('/:requestId', async (req,res)=>{
    try{
        const request = await Request.findById(req.params.requestId);
        res.json(request);
    }catch(err){
        res.json({message:err})
    }
});

//delete Specific request

router.delete('/:requestId', async (req,res)=>{
    try{
         const removeRequest = await Request.remove({_id:req.params.requestId});

         res.json(removeRequest);
    }catch(err){
        res.json({message:err});
    }
});

//update request
router.patch('/:requestId',async (req,res)=> {
   try{
       const updateRequest = await Request.updateOne(
           {_id: req.params.requestId},
           {
            $set:{status:req.body.status},
           });

           res.json(updateRequest);
   }catch(err){
       res.json({message:err});
   }
});

module.exports = router;