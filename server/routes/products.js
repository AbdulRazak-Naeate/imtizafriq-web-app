const express  = require('express');
const router   = express.Router();
const Product  = require('../models/Product');
const verify   = require('./verifyToken');
const Store    = require('../models/Store');
const {uploadImage}   = require('../upload');


const {productValidation} = require('../validation');


//Get all products
router.get('/',async(req,res)=>{
    try{
        const products= await Product.find();
        res.json(products);
    
    }catch(err){
        res.json({message:err});
    }
});

//Submit a product
router.post('/',uploadImage('./server/uploads/products'),verify, async(req,res)=>{

    const userId = req.user._id; //get userid

    const store = await Store.findOne({userId:userId});//get user Store

    //const store_Id=store._id; //get user store id

    //Validation
    const {error} = productValidation(req.body);

    if (error) return  res.status(400).send(error.details[0].message);

    //check if product name already exist
    const productnameExist = await Product.findOne({name:req.body.name});
    if (productnameExist) return res.status(400).send("Product name already taken");
    console.log(req.files);
    const product = new Product({
        color:req.body.color,
        size:req.body.size,
        name:req.body.name,
        description:req.body.description,
        specification:req.body.specification,
        price:req.body.price,
        likes:req.body.likes,
        storeId:req.body.storeId,
        image:req.files,
        digital_product_url:req.body.digital_product_url,
        comments:req.body.comments
    });

    try{

       const saveProduct = await product.save();
        res.json({product:saveProduct,status:200});
    }catch(err){
        res.json({message:err})
    }
});

//get specific product
router.get('/:productId', async (req,res)=>{
    try{
        const product = await Product.findById(req.params.productId);
        res.json(product);
    }catch(err){
        res.json({message:err})
    }
});

//get specific store products
router.get('/store/:storeId', async (req,res)=>{
    try{
        const product = await Product.find()
        .where('storeId')
        .in(req.params.storeId);
        res.json(product);
    }catch(err){
        res.json({message:err})
    }
});

//delete Specific product

router.delete('/:productId', async (req,res)=>{
     try{
          const removeProduct = await Product.remove({_id:req.params.productId});
          res.json(removeProduct);
     }catch(err){
         res.json({message:err
        });
     }
});

//update Product
router.patch('/:productId',async (req,res)=> {
    try{
        const updateProduct = await Product.updateOne(
            {_id: req.params.productId},
            {$set:{name:req.body.name},
             $set:{description:req.body.description},
             $set:{price:req.body.price},
            });

            res.json(updateProduct);
    }catch(err){
        res.json({message:err});
    }
});

module.exports = router;