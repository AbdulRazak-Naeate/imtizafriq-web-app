const express = require('express');
const router = express.Router();
const Store= require('../models/Store');
const verify =require('./verifyToken');
const {storeValidation} = require('../validation');
const {uploadImage}= require('../upload');

//Get all stores
router.get('/',async(req,res)=>{
    try{
        const stores = await Store.find();
        res.json(stores);
    
    }catch(err){
        res.json({message:err});
    }
});

//Submit a store
router.post('/',uploadImage('./uploads/stores'),verify,async(req,res)=>{

    const {error} = storeValidation(req.body);

    //Validation
    if (error) return  res.status(400).send(error.details[0].message);

    //check if store already exist
    const storeExist = await Store.findOne({name:req.body.name});
    if (storeExist) return res.json({message:"Store name already exist"}).status(402).send("Store name already taken");
    
    console.log(req.files);
    const userId=req.user._id
    //res.send(req.user._id);
    const store = new Store({
        name:req.body.name,
        userId:req.body.userId,
        country:req.body.country,
        state:req.body.state,
        city:req.body.city,
        phone:req.body.phone,
        email:req.body.email,
        description:req.body.description,
        image:req.files,
        storeCategoryId:req.body.storeCategoryId,
        ghPostGPS:req.body.ghPostGPS,
        validStatus:req.body.validStatus
    });
    try{
        saveStore = await store.save();
        res.json({store:saveStore,message:"store created successfully"})
        .status(200);
    }catch(err){
        res.json({store:null,message:err}).status(401)
    }
});

//get specific store
router.get('/:storeId', async (req,res)=>{
    try{
        const store = await Store.findById(req.params.storeId);
        res.json(store);
    }catch(err){
        res.json({message:err})
    }
});

//get specific store base on userId
router.get('/user/:userId', async (req,res)=>{
    try{
        const store = await Store.find()
        .where('userId')
        .in(req.params.userId);
        res.json({store:store,message:"successfully loaded",status:200});
    }catch(err){
        res.json({message:err,status:400})
    }
});


//delete Specific store

router.delete('/:storeId', async (req,res)=>{
     try{
          const removeStore = await Store.remove({_id:req.params.storeId});
          res.json(removeStore);
     }catch(err){
         res.json({message:err})
     }
});

//update Store
router.patch('/:storeId',async (req,res)=> {
    try{
        const updateStore = await Store.updateOne(
            {_id: req.params.storeId},
            {$set:{name:req.body.name},
             $set:{description:req.body.description},
             $set:{price:req.body.price},
            });

            res.json(updateStore);
    }catch(err){
        res.json({message:err});
    }

    
});

module.exports = router ;
