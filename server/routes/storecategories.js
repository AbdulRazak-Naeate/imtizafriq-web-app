const express = require('express');
const router = express.Router();
const StoreCategory= require('../models/StoreCategory');
const verify =require('./verifyToken');

const {storeCategoryValidation} = require('../validation');

//Get all StoreCategorys
router.get('/',async(req,res)=>{
    try{
        const storeCategory = await StoreCategory.find();
        res.json(storeCategory);
    
    }catch(err){
        res.json({message:err});
    }
});

//Submit a StoreCategory
router.post('/',async(req,res)=>{

    const {error} = storeCategoryValidation(req.body);

    //Validation
    if (error) return  res.status(400).send(error.details[0].message);

     //check if storeCategory already exist
     const categoryExist = await StoreCategory.findOne({name:req.body.name});
     if (categoryExist) return res.status(400).send("Category already taken");
     
      //check if short code already exist
      const shortCode = await StoreCategory.findOne({shortCode:req.body.shortCode});
      if (shortCode) return res.status(400).send("shortCode already taken");
      

   //create new Store Category
    const storeCategory = new StoreCategory({
        name:req.body.name,
        shortCode:req.body.shortCode,
       
    });

    try{
        saveStoreCategory = await storeCategory.save();
        res.json(saveStoreCategory);
    }catch(err){
        res.json({message:err})
    }
});

//get specific StoreCategory
router.get('/:storeCategoryId', async (req,res)=>{
    try{
        const storeCategory = await StoreCategory.findById(req.params.storeCategoryId);
        res.json(storeCategory);
    }catch(err){
        res.json({message:err})
    }
});




//delete Specific StoreCategory

router.delete('/:storeCategoryId',verify, async (req,res)=>{
     try{
          const removeStoreCategory = await StoreCategory.remove({_id:req.params.storeCategoryId});
          res.json(removeStoreCategory);
     }catch(err){
         res.json({message:err});
     }
});

//update StoreCategory
router.put('/:storeCategoryId', async (req,res)=> {
    try{
        const updateStoreCategory = await StoreCategory.updateOne(
            {_id: req.params.storeCategoryId},
            {$set:{name:req.body.name},
            $set:{short_code:req.body.short_code}
            });

            res.json(updateStoreCategory);
            
    }catch(err){
        res.json({message:err});
    }
});

module.exports = router ;
