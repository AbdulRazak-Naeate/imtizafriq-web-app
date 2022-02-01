const express = require('express');
const router = express.Router();
const Countries= require('../../models/world/Countries');

//get countris data
router.get('/', async(req,res) =>{
       try{
        const countries = await Countries.find();
    
        res.json({countries:countries});
              
       }catch(err){
           console.log(err)
       }
});



module.exports = router;