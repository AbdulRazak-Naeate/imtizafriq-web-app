const express = require('express');
const router  = express.Router();
const Cart    = require('../models/Cart');
const mongoose= require('mongoose');

//get all carts

/**/ router.get('/', async (req,res)=>{
    try{
          const carts = await Cart.find();
          res.json(carts);
    }catch(error){

        res.json({message:error});
    }
}); 

//get specific user carts

router.get('/:userId', async (req,res)=>{
    try{
          const carts = await Cart.findOne({userId:req.params.userId});
          res.json({cart:carts,status:200})
    }catch(error){

        res.json({message:error});
    }
});
// submit a Cart

router.post('/',async (req,res)=>{
    try{
          console.log(req.body.productId)
         const userCartAllreadyAdded= await Cart.findOne({userId:req.body.userId});
        if (userCartAllreadyAdded) {//product Exist increase quantity
            console.log('usercart cart exist ')

                let pid=req.body.productId
                const itemAlreadyExistInCart = await Cart.findOne(
                       {
                        userId:req.body.userId,
                        items:{$elemMatch:{productId:pid}}
                        },
                      
                      )
               
                   var pQty=0;
                   var matchItems=itemAlreadyExistInCart.items;
                   for(let i=0;i<matchItems.length;i++){
                       if (matchItems[i].productId===pid) {
                          pQty=matchItems[i].quantity
                          console.log(" q "+ pQty);
                       }
                   }
                     console.log("Matched item "+itemAlreadyExistInCart.items[0]);
                if (itemAlreadyExistInCart){
                    let product=req.body.product
                    let line_item_sub_price=(pQty*parseInt(product.price))
                   // console.log(req.body.quantity);
                    console.log('product exist in cart inc qty, sub price :'+line_item_sub_price)
                    const updateCartQuantity =await Cart.findOneAndUpdate({
                        items:{
                            $elemMatch:{productId:req.body.productId}
                             }
                            },
                        {
                            $inc: {'items.$.quantity':1},
                            $set:{'items.$.line_item_sub_price':line_item_sub_price}
                        },   
                        { new:true,useFindAndModify:false}
                        
                   ).then((ret=>{
                       //console.log(ret);
                   }))
        }else{
                 let product=req.body.product
                 //let line_item_sub_price=req.body.quantity*product.price

                console.log('add new product into cart')
                var sub_price = parseInt(req.product.price)
               const addtoCart = await Cart.findOneAndUpdate({userId:req.body.userId},{
                      $push:{items:{
               
                        productId:req.body.productId,
                        quantity:req.body.quantity,
                        product:req.body.product,
                        line_item_sub_price:sub_price
                     
                }}
              },{new:true,useFindAndModify:false});
              //console.log(addtoCart)

            }
          }else{
            console.log('user cart not exist creating new one')

            var pid=req.body.productId
            let subprice=parseInt(req.body.product.price)
            //let line_item_sub_price=req.body.quantity*product.price
            var cartItem={};
             cartItem={
               
                    productId:req.body.productId,
                    quantity:req.body.quantity,
                    product:req.body.product,
                    line_item_sub_price:subprice
                 
            }
             const _cart = new Cart({
            userId:req.body.userId,
            items:[cartItem]}
            ); 
            
            const savedCart = await _cart.save();
        }

      const cart = await Cart.findOne({userId:req.body.userId});
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
        Cart.findOneAndUpdate({
            items:{
                $elemMatch:{productId:req.body.productId}
                 }
                },
            {
                $set: {'items.$.quantity':req.body.quantity}
            },   
            { new:true,useFindAndModify:false}).then(ret=>{
            //res.json(ret)
        });

     //return the whole cart 
       const  cart = await Cart.findOne({userId:req.body.userId});
       res.json({cart:cart,status:200})
    }catch(err){
        console.log(err);
    }

});

//empty user Cart
router.patch('/:userId', async (req,res)=>{
    console.log(req.params.userId)

   try{
         const emptyUserCart= await Cart.findOneAndUpdate({userId:req.params.userId}
               ,{
                   $set:{items:[]}
               },{useFindAndModify:false}).then(ret=>{
            console.log(ret)

         });
   const  cart = await Cart.findOne({userId:req.params.userId});
   res.json({cart:cart,status:200})
   }catch(errr){
        
   }
})

//deletete Item from user Cart
router.delete('/:productId/:userId', async (req,res)=>{
      console.log(req.params.userId)

     try{
           const deleteFromCart= await Cart.updateOne({
            items:{
                $elemMatch:{productId:req.params.productId}
                 }},{
                     $pull:{items:{productId:req.params.productId}}
                 },{multi:true}).then(ret=>{
              console.log(ret)
 
           });
           console.log(req.params.productId)
     const  cart = await Cart.findOne({userId:req.params.userId});
     res.json({cart:cart,status:200})
     }catch(errr){
          
     }
})

module.exports = router;