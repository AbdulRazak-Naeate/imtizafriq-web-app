const express  = require('express');
const router   = express.Router();
const PrefStyleProduct = require('../models/PrefStyleProduct')
const verify   = require('./verifyToken');
const {uploadImage}   = require('../upload');


//Get all products
router.get('/',async(req,res)=>{
    try{
        const products= await PrefStyleProduct.find();
        res.json({prefarestyle:products});
    
    }catch(err){
        res.json({message:err});
    }
});


//Submit a prefare Style product
router.post('/', async(req,res)=>{
    console.log(req.body)
    // const userId = req.user._id; //get userid
 
     //const store_Id=store._id; //get user store id
 
     //Validation
     //const {error} = productValidation(req.body);
 
     //if (error) return  res.json({status:400,message:error.details[0].message});
 
     //check if product name already exist
     const productnameExist =  await PrefStyleProduct.findOne({name:req.body.name});
     if (productnameExist) return  res.json({status:400,message:"Product name already taken"});
     console.log(req.files);
     const product = new PrefStyleProduct({
         color:req.body.color,
         size:req.body.size,
         name:req.body.name,
         description:req.body.description,
         category:req.body.category,
         specification:req.body.specification,
         price:req.body.price,
         image:req.files,
     });
 
     try{
 
        const saveProduct = await product.save();
         res.json({product:saveProduct,status:200,message:"Prefared style product successfully createdm..."});
     }catch(err){
         res.json({message:err})
     }
 });
 




module.exports = router;