const express = require('express');
const router = express.Router();
const States =require('../../models/world/States')
//get countris data
router.get('/', async(req,res) =>{
       try{
        const states = await States.find();
    
        res.json({states:states});
              
       }catch(err){
           console.log(err)
       }
});

//get states by countryid 
router.get('/:countryId', async(req,res) =>{

    try{
        var cid= req.params.countryId;
        console.log(cid)
     const states = await States.find({country_id:cid});
 
     res.json({states:states});
           
    }catch(err){
        console.log(err)
    }
});


module.exports = router;