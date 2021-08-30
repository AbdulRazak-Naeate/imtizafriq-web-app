const express = require('express');
const router  = express.Router();
const Cart    = require('../models/Cart');


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
        const cart = new Cart({
            productId:req.body.productId,
            storeId:req.body.storeId,
            userId:req.body.userId,
            data:req.body.data}
            );
      const savedCart = await cart.save();
      res.json(savedCart);

    }catch(error){
       res.json(error);
    }
});

module.exports = router;