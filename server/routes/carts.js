/* eslint-disable no-unused-vars */
const express = require('express');
const router  = express.Router();
const Cart    = require('../models/Cart');
const jwt = require('jsonwebtoken');



router.get('/generate_token',async(req,res)=>{
    //Create and asigned a token
  const token = jwt.sign({_id:req.body.cartId},process.env.TOKEN_SECRET);
  const  cart = await Cart.findOne({userId:req.body.userId});
  res.json({token:token,cart:cart})

})
//get all carts
router.get('/', async (req,res)=>{
    try{
          const carts = await Cart.find();
          res.json(carts);
    }catch(error){

        res.json({message:error});
    }
}); 


const getCartByUserId = async (req,res) =>{
    try{   
        
        const carts = await Cart.findOne({userId:req.params.userId});
        res.json({cart:carts,status:200})
  }catch(error){

      res.json({message:error});
  }
}
//get specific user carts

router.get('/:userId', async (req,res)=>{
        getCartByUserId(req,res)
});
// submit a Cart

router.post('/',async (req,res)=>{
    try{
         
         const userCartAllreadyAdded= await Cart.findOne({userId:req.body.userId});
        if (userCartAllreadyAdded) {//product Exist increase quantity
            console.log('usercart cart exist ')

                let pid=req.body.productId
                //console.log("productId "+pid);
                const itemAlreadyExistInCart = await Cart.findOne(
                       {
                        userId:req.body.userId,
                       
                        },
                       { items:{$elemMatch:{productId:pid}}}
                      )

                      
                    var matchItems=itemAlreadyExistInCart.items;
                    // console.log("mtachItems :"+itemAlreadyExistInCart)
                     var pQty=exactMatchQuantity(matchItems,pid)//gets eaxct item quantity then add
                   
                     //console.log("Matched item qty "+pQty);
                     //console.log("Matched Items length : "+matchItems.length);
                if (matchItems.length>0){
                    let product=req.body.product
                    let line_item_sub_price=((pQty)*parseInt(product.price))
                   // console.log(req.body.quantity);
                    console.log('product exist in cart inc qty, sub price :'+line_item_sub_price)
                    const updateCartQuantity =await Cart.findOneAndUpdate({
                        userId:req.body.userId,
                       
                        },{//update item
                        items:{
                            $elemMatch:{productId:req.body.productId}
                             }
                            },
                        {
                            $inc:{'items.$.quantity':1},//increate quantity by 1
                            $set:{'items.$.line_item_sub_price':line_item_sub_price}, //set subtotal price quantity by price
                        },   
                        { new:true,useFindAndModify:false}
                        
                   ).then((ret)=>{
                            console.log(ret)
                   })
                   updateSubtotal(req,res);

                   
        }else{
                 let product=req.body.product
                 //let line_item_sub_price=req.body.quantity*product.price

                console.log('add new product into cart')
                var sub_price = parseInt(req.body.product.price)
               const addtoCart = await Cart.findOneAndUpdate({userId:req.body.userId},{
                      $push:{items:{
               
                        productId:req.body.productId,
                        quantity:req.body.quantity,
                        color:'null',
                        size:'null',
                        measurement:{back:"",chest:"",shirtLength:"",sleeve:"",trouserLength:"",waist:"",thigh:"",bust:""},
                        product:req.body.product,
                        line_item_sub_price:sub_price,
                        selected:false
                     
                }}
              },{new:true,useFindAndModify:false}
              )      
              
              updateSubtotal(req,res);

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
                    color:'null',
                    size:'null',
                    measurement:{back:"",chest:"",shirtLength:"",sleeve:"",trouserLength:"",waist:"",thigh:"",bust:""},
                    product:req.body.product,
                    line_item_sub_price:subprice,
                    selected:false
                   
            }
             const _cart = new Cart({
            userId:req.body.userId,
            items:[cartItem],

           }
            ); 

            const savedCart = await _cart.save();      
            updateSubtotal(req,res);
            //console.log(savedCart);

        }

    }catch(error){
       res.json(error);
    }
});

//update cart item qty and subprice
router.patch('/quantity/:productId',async (req,res)=>{

    try{
        var pId =req.body.productId;
        var value= parseInt(req.body.quantity)
        var subtotalqty=(value)*parseInt(req.body.price);
       // console.log("value "+subtotalqty)
        Cart.findOneAndUpdate({userId:req.body.userId,
            items:{
                $elemMatch:{productId:req.body.productId}
                 }
                },
            {
                $set: {
                      'items.$.quantity':value,
                      'items.$.line_item_sub_price':subtotalqty,
                      }
            },   
            { new:true,useFindAndModify:false}).then(ret=>{
            
              updateSubtotal(req,res)
              
        });
        
           

     
    }catch(err){
        console.log(err);
    }

});
//update cart item select eg true or false
router.patch('/item/selection',async (req,res)=>{

    try{
        var value=  req.body.selected;
     
         await  Cart.findOneAndUpdate({userId:req.body.userId,
                items:{
                    $elemMatch:{productId:req.body.productId}
                     }
                    },
                {
                    $set: {
                          'items.$.selected':value,
                          }
                },   
                { new:true,useFindAndModify:false}).then(ret=>{
                  console.log(ret)
                 updateSubtotal(req,res)            
            });
      
        
           

     
    }catch(err){
        console.log(err);
    }

});

//update cart item specs eg size and color
router.patch('/specs/colorandsize',async (req,res)=>{

    try{
        var pId =req.body.productId;
        var value= req.body.value
        var type=  req.body.type;
        
        if (type ==='color'){
            Cart.findOneAndUpdate({userId:req.body.userId,
                items:{
                    $elemMatch:{productId:req.body.productId}
                     }
                    },
                {
                    $set: {
                          'items.$.color':value,
                          }
                },   
                { new:true,useFindAndModify:false}).then(ret=>{
                
                  updateSubtotal(req,res)
                  
            });
        }else{
            Cart.findOneAndUpdate({userId:req.body.userId,
                items:{
                    $elemMatch:{productId:req.body.productId}
                     }
                    },
                {
                    $set: {
                          'items.$.size':value,
                          }
                },   
                { new:true,useFindAndModify:false}).then(ret=>{
                
                  updateSubtotal(req,res)
                  
            });
        }
        
           

     
    }catch(err){
        console.log(err);
    }

});

//update cart item specs (measurement)
router.patch('/specs/measurement',async (req,res)=>{

    try{
        var pId =req.body.productId;
      
            var measurement= JSON.parse(req.body.measurement)
            console.log(measurement.back)
            Cart.findOneAndUpdate({userId:req.body.userId,
                items:{
                    $elemMatch:{productId:req.body.productId}
                     }
                    },
                {
                    $set: {
                          'items.$.measurement':measurement,
                          }
                },   
                { new:true,useFindAndModify:false}).then(ret=>{
                
                  updateSubtotal(req,res)
                  
            });
    
           

     
    }catch(err){
        console.log(err);
    }

});

//update cart set tempid to permanentid
router.patch('/updateuserid/:tempuserId/:userId',async (req,res)=>{

    try{
       
        Cart.updateMany({userId:req.params.tempuserId
                },
            {
                $set: {
                      userId:req.params.userId,
                      }
            },   
            { new:true,useFindAndModify:false}).then(ret=>{
            
                getCartByUserId(req,res)

              
        });
        
           

     
    }catch(err){
        console.log(err);
    }

});
//empty user Cart
router.patch('/:userId', async (req,res)=>{

   try{
         await Cart.findOneAndUpdate({userId:req.params.userId}
               ,{
                   $set:{items:[],subtotal:0},
                 
               },{useFindAndModify:false}).then(ret=>{
                   
            console.log(ret)

         });
   const  cart = await Cart.findOne({userId:req.params.userId});
   res.json({cart:cart,status:200})
   }catch(errr){
        
   }
})

//deletete Item from user Cart
router.patch('/removeitem/:userId', async (req,res)=>{

     try{
           const removeFromCart= await Cart.findOneAndUpdate({userId:req.params.userId,
            items:{
                $elemMatch:{productId:req.body.productId}
                 }},{
                     $pull:{items:{productId:req.body.productId}}
                 },{multi:true}).then(ret=>{
                 console.log(ret)
           });

           updateSubtotal(req,res);
           
     }catch(errr){
          
     }
});

//refreshcart Item from user Cart --remove items alreader selected and ordered
router.patch('/refreshcart/:userId', async (req,res)=>{
    
    try{
          const refreshCart = await Cart.findOneAndUpdate({userId:req.params.userId,
           items:{
               $elemMatch:{selected:true}
                }},{
                    $pull:{items:{selected:true}}
                },{multi:true}).then(ret=>{
                    
             console.log("refresh "+JSON.stringify(ret))
                
          });    
        
          Cart.findOneAndUpdate({userId:req.params.userId},
            {
              $set:{subtotal:0},
            },   
            { new:true,useFindAndModify:false}
            ).then((ret=>{
            //console.log("updateSub "+ret)
           }))
         //return the whole cart 
         const  cart = await Cart.findOne({userId:req.params.userId});
         res.json({cart:cart,status:200})
        
    }catch(errr){
         
    }
});

router.delete('/delete/expiredcart', async (req,res)=>{
   try{
       var currentDate= new Date()
       console.log(currentDate)
       const deleteExpiredCart =await Cart.deleteMany({expires:{$lt:currentDate}})
       res.json(deleteExpiredCart)
   }catch(err){
     console.log(err)
   }
})

const exactMatchQuantity =(matchItems,productId)=>{//search and get the exact cartItem usinf productId
    var previuosQty=0;
    for(let i=0;i<matchItems.length;i++){
        if (matchItems[i].productId===productId) {
            previuosQty=matchItems[i].quantity
           console.log(" q "+ previuosQty);
        }
    return previuosQty+1 //gets cartItem provious qauntity and add 1 for increment
}

}
const updateSubtotal = async (req,res) =>{//sum all line_items_sub_price
     var subtotal = 0;
     console.log("userId "+req.body.userId)
  const aggr= await Cart.aggregate([{$match:{userId:req.body.userId}},{$unwind:"$items"},
        {$match:{'items.selected':true}},
    {
        $group:{
            "_id":'0',
            "subTotal":{$sum:"$items.line_item_sub_price"}
     
          }
   }]).then((ret=>{ 
       //update subtotal 
        
    try{
      var retLength=ret.length
       console.log("aggr : "+JSON.stringify(ret)+ " length :"+retLength);
       if(retLength!==0){
        subtotal=ret[0].subTotal;

       }
       }catch(err){
           console.log("subTotal Error : "+err)
       }
        
        
        })).then(()=>{

          
        });
        await  Cart.findOneAndUpdate({userId:req.body.userId},
        {
          $set:{subtotal:subtotal},
        },   
        { new:true,useFindAndModify:false}
        ).then((ret)=>{
        //console.log("updateSub "+ret)
       })
       
  //return the whole cart 
  const  cart = await Cart.findOne({userId:req.body.userId}).then((ret)=>{
   
          console.log(JSON.stringify(ret))
        res.json({cart:ret,status:200})

  });
       


   
}

module.exports = router;