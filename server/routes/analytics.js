const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');

//get transactions

router.get('/transactions', async (req,res)=>{
   const analytics =[]

    const transactions = await Order.find();
    //get Completed orders = sales 
    const completedAggr = await Order.aggregate([{$match:{status:'Completed'}},{$unwind:'$totalPrice'},
    {
        $group:{
            _id:'0',
            count:{$sum:1},
            total:{$sum:'$totalPrice'}
        }
    }
]);

//Current orders or imcompleted transactiond
const inCompletedAggr = await Order.aggregate([{$match:{$or:[{status:'Pending'},{status:'Processing'}]}},{$unwind:'$totalPrice'},
    {
        $group:{
            _id:'0',
            count:{$sum:1},
            total:{$sum:'$totalPrice'}
        }
    }
]);


const alltimeAggr = await Order.aggregate([{$unwind:'$totalPrice'},
{
    $group:{
        _id:'0',
        count:{$sum:1},
        total:{$sum:'$totalPrice'}
    }
}
]);
    

    res.json({transactions:transactions,completedAggregate:completedAggr,inCompleteAggregate:inCompletedAggr,alltimeAggregate:alltimeAggr,message:'transactions loaded'});

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