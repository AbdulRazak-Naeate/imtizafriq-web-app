const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');

//get transactions

router.get('/transactions', async (req,res)=>{
  // const analytics =[]

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


router.post('/transactions/product/sales/monthly/:productId',async (req,res)=>{

    var months =[{label:'jan',num:1},{label:'feb',num:2},{label:'mar',num:3},{label:'apr',num:4},
                   {label:'may',num:5},{label:'jun',num:6},{label:'jul',num:7},{label:'aug',num:8},
                   {label:'sep',num:9},{label:'oct',num:10},{label:'nov',num:11},{label:'dec',num:12}];
    var year =req.body.year ;
    var total=0;            
    const data=[];
     for(var i = 0;i < months.length;i++){
         //var m=months[i].num;         
                   
         var m=months[i].num;
         var label=months[i].label;
         var productid=req.params.productId
        const transMonthly = await Order.aggregate(
            [
                {
                $match:{productId:productid}
                },
           {
               $match:{status:"Completed"}
           },

            {
                $match:{$expr:{
                     $eq:[{$year: "$date"},year]
                  }}
            },
             {
                 $redact:{ 
                 $cond:[
                     { $eq:[{$month:'$date'},m]},
                     "$$KEEP","$$PRUNE"
                 ]
                }
              },{
            $group:{
                _id:'0',
                count:{$sum:1},
                sales:{$sum:'$totalPrice'}
            }
        }
        ]);
        if (transMonthly.length>0){
            data.push({name:label,"Monthly Sales":transMonthly[0].sales});
            total+=transMonthly[0].sales;
            
        }else{
            data.push({name:label,"Monthly Sales":0});

        }
     }
   
     res.json({monthlySales:data,totalSales:total})
})

router.post('/transactions/sales/monthly',async (req,res)=>{

    var months =[{label:'jan',num:1},{label:'feb',num:2},{label:'mar',num:3},{label:'apr',num:4},
                   {label:'may',num:5},{label:'jun',num:6},{label:'jul',num:7},{label:'aug',num:8},
                   {label:'sep',num:9},{label:'oct',num:10},{label:'nov',num:11},{label:'dec',num:12}];
    var year =req.body.year ;
    var total=0;            
    const data=[];
     for(var i = 0;i < months.length;i++){
         //var m=months[i].num;         
                   
         var m=months[i].num;
         var label=months[i].label;
         console.log(label)
        const transMonthly = await Order.aggregate(
            [
           {
               $match:{status:"Completed"}
           },

            {
                $match:{$expr:{
                     $eq:[{$year: "$date"},year]
                  }}
            },
             {
                 $redact:{ 
                 $cond:[
                     { $eq:[{$month:'$date'},m]},
                     "$$KEEP","$$PRUNE"
                 ]
                }
              },{
            $group:{
                _id:'0',
                count:{$sum:1},
                sales:{$sum:'$totalPrice'}
            }
        }
        ]);
        if (transMonthly.length>0){
            data.push({name:label,"Monthly Sales":transMonthly[0].sales});
            total+=transMonthly[0].sales;
            
        }else{
            data.push({name:label,"Monthly Sales":0});

        }
     }
   
     res.json({monthlySales:data,totalSales:total})
})


router.get('/transactions/sales/monthly/y',async (req,res)=>{


                   

        const transMonthly = await Order.find({
            $expr: {
                    $and: [
                        {
                          "$eq": [
                            {
                             "$month": "$date"
                           },
                            2
                       ]
                     },
                     {
                       "$eq": [
                           {
                         "$year": "$date"
                          },
                          2022
                         ]
                       }
                    ]
                   }});
        
     
   
     res.json({transMonthly})
})

module.exports = router;