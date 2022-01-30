const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');

//get transactions

router.get('/transactions', async (req,res)=>{
    const transactions = await Order.find();
    const aggr = await Order.aggregate([{$unwind:'$totalPrice'},
    {
        $group:{
            _id:'0',
            count:{$sum:1},
            total:{$sum:'$totalPrice'}
        }
    }
]);


    res.json({transactions:transactions,total:aggr,message:'transactions loaded'});

});


//get transactions base on store Id

router.get('/transactions/:storeId', async (req,res)=>{
    const transactions = await Order.find({storeId:req.params.storeId});
    const aggr = await Order.aggregate([{$match:{storeId:req.params.storeId}},{$unwind:'$totalPrice'},
    {
        $group:{
            _id:'0',
            count:{$sum:1},
            total:{$sum:'$totalPrice'}
        }
    }
]);

     console.log(transactions)


    res.json({transactions:transactions,total:aggr,message:'transactions loaded'});

});


//get all transactions base on store Id

router.post('/transactions/many/ids', async (req,res)=>{
   
       // console.log(req.body.storeIds);
        const _ids=JSON.parse(req.body.storeIds);
        console.log(_ids[0]);
        const analytics = [];
        
        for (var i = 0; i <= _ids.length ; i++){
    

         try{ 
            var  id=_ids[i].id;
            var name=_ids[i].name
              console.log(id)

            
         const transactions = await Order.find({storeId:id});
     
        const aggr = await Order.aggregate([{$match:{storeId:id}},{$unwind:'$totalPrice'},
        {
            $group:{
                _id:'0',
                count:{$sum:1},
                total:{$sum:'$totalPrice'}
            }
        }
    ]);
     
            console.log(aggr)
              var tranxobj={};
              if (aggr.length!==0){
                 tranxobj={storeId:id,name:name,transactions:transactions,total:aggr[0].total,count:aggr[0].count
              }
             }else{
                 tranxobj={storeId:id,name:name,transactions:[],total:0,count:0
             }
            }
              analytics.push(tranxobj);
                   console.log(analytics)
        
        
    

      }catch(err){

           }
        }   
        
        res.json({analytics:analytics});

});

module.exports = router;