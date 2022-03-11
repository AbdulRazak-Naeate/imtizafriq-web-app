const express = require('express');
const router = express.Router();
const Cities= require('../../models/world/Cities');

//get cities data
router.get('/', async(req,res) =>{
       try{
        const states = await Cities.find().sort({"name":1}).collation({ locale: "en", caseLevel: true });
    
        res.json({states:states});
              
       }catch(err){
           console.log(err)
       }
});

//get cities data by state Id
router.get('/:stateId', async(req,res) =>{
    try{
     const cities = await Cities.find({state_id:req.params.stateId}).sort({name:1}).collation({ locale: "en", caseLevel: true });
 
     res.json({cities:cities});
           
    }catch(err){
        console.log(err)
    }
});



module.exports = router;