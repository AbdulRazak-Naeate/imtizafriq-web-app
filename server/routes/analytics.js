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


    res.json({transactions:transactions,aggregate:aggr,message:'transactions loaded'});

});


//get transactions

router.get('/transactions/:storeId', async (req,res)=>{
    const transactions = await Order.find(/* {storeId:req.params.storeId} */);
    const aggr = await Order.aggregate([/* {$match:{storeId:req.params.storeId}}, */{$unwind:'$totalPrice'},
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


module.exports = router;