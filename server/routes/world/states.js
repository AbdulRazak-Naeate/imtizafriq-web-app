const express = require('express');
const router = express.Router();
const States =require('../../models/world/States')
//get countris data
router.get('/', async(req,res) =>{
       try{
        const states = await States.find().sort({name:1});
    
        res.json({states:states}).collation({ locale: "en", caseLevel: true });
              
       }catch(err){
           console.log(err)
       }
});

//get states by countryid 
router.get('/:countryId', async(req,res) =>{

    try{
        var cid= req.params.countryId;
        console.log(cid)
     const states = await States.find({country_id:cid}).sort({name:1}).collation({ locale: "en", caseLevel: true });
 
     res.json({states:states});
           
    }catch(err){
        console.log(err)
    }
});


module.exports = router;