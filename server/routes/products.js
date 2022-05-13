const express  = require('express');
const router   = express.Router();
const Product  = require('../models/Product');
const PrefStyleProduct = require('../models/PrefStyleProduct')
const verify   = require('./verifyToken');
const {uploadImage}   = require('../upload');
const fs = require('fs');
var mongoose=require('mongoose');
const {productValidation} = require('../validation');
const { cloudinary } = require('../cloudinary');
const path = require('path');

const indexPath  = path.resolve(__dirname, '..', '../client/build', 'index.html');

/* 
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert'); */


/* // Database Name
const dbName = 'daabia';
const client = new MongoClient(process.env.DB_COMMUNITY_CON,{ useUnifiedTopology: true }); */



//Get all products
router.get('/',async(req,res)=>{
    try{
        const products= await Product.find();
        res.json({products:products});
    
    }catch(err){
        res.json({message:err});
    }
});
//upload image
router.post('/uploadimage', async(req,res)=>{
    var imageUrls=[];
    var base64encImages=req.body.data
    try {
         for(let i=0;i<base64encImages.length;i++){
            const fileStr  = base64encImages[i];
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'products',
            });
            console.log(uploadResponse);
            imageUrls.push(uploadResponse.secure_url)
         }     
       res.json({ msg: 'yaya',urls:imageUrls });

    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }


    
 });
 
//Submit a product
router.post('/',uploadImage('./server/uploads/products'),verify, async(req,res)=>{


    ///res.json({files:req.files,body:req.body});
    //Validation
   
    
    const {error} = productValidation(req.body);

    if (error) return  res.json({status:400,message:error.details[0].message});
    var imageUrls=[];
    var base64encImages=req.body.encodedimages
    try {
         for(let i=0;i<base64encImages.length;i++){
            const fileStr  = base64encImages[i];
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                upload_preset: 'products',
            });
            console.log(uploadResponse);
            imageUrls.push(uploadResponse.secure_url)
         }     
       res.json({ msg: 'yaya',urls:imageUrls });

    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
     //check if product name already exist
    const productnameExist = await Product.findOne({name:req.body.name});
    if (productnameExist) return res.json({status:400,message:"Product name already taken"}); 
    //console.log(req.files);
    var stockvalue=parseInt(req.body.stock);
    const product = new Product({
        color:req.body.color,
        size:req.body.size,
        name:req.body.name,
        description:req.body.description,
        category:req.body.category,
        specification:req.body.specification,
        stock:{currentstock:stockvalue,availablestock:stockvalue,
               alltimestock:stockvalue},
        price:req.body.price,
        likes:req.body.likes,
        image:imageUrls,
        digital_product_url:req.body.digital_product_url,
        comments:req.body.comments
    });

    try{

       const saveProduct = await product.save();
        res.json({product:saveProduct,status:200,message:"product successfully created",d:req.body});
        
    }catch(err){
        res.json({message:err})
    }
});



//Submit a prefare Style product
router.post('/prefstyle',uploadImage('./server/uploads/products/prefarestyleproducts'), async(req,res)=>{
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
     console.log(req.body);
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
        return res.json({product:saveProduct,status:200,message:"Prefared style product successfully createdm..."});
     }catch(err){
         res.json({message:err})
     }
 });
 
//get specific product metadata
router.get('/metadata/:productId', async (req,res)=>{
    
    fs.readFile(indexPath, 'utf8',async (err, htmlData) => {
        if (err) {
            console.error('Error during file reading', err);
            return res.status(404).end()
        }
        // TODO get post info
 try{
        const product = await Product.findById({_id:req.params.productId});
        //res.json({product:product,status:200,message:"product successfully created"});
        htmlData = htmlData.replace(
            "<title>ImtizAfriq</title>",
            `<title>${product.name}</title>`
        ).replace('__META_OG_TITLE__', product.name)
        .replace('__META_OG_DESCRIPTION__', product.description)
        .replace('__META_DESCRIPTION__', product.description)
        .replace('__META_OG_IMAGE__', product.image[0].secure_url)
      /*   fs.writeFileSync(indexPath,htmlData,{encoding:'utf8',flag:'w'}) */

        return res.send(htmlData);
    }catch(err){
        res.json({message:err})
    }
        // TODO inject meta 
    });
   
});
//get specific product
router.get('/:productId', async (req,res)=>{
    
 try{
        const product = await Product.findById({_id:req.params.productId});
       
        res.json({product:product,status:200,message:"product successfully created"});
    }catch(err){
        res.json({message:err})
    }
     
   
});


//get specific category products 
router.get('/category/:categoryId', async (req,res)=>{
    try{
        const product = await Product.find()
        .where('category')
        .in(req.params.categoryId);
        res.json({products:product,message:`we've found ${product.length} items that matches your search `,status:200});
    }catch(err){
        res.json({message:err,status:400})
    }
})
//perform text match search on products
router.get('/find/:searchstring', async (req,res)=>{
    try{
       // await Product.schema.createIndexes({name:"text",description:"text"});
        const product = await Product.find({$text:{$search:req.params.searchstring}},{});
        res.json({products:product,message:`we've found ${product.length} items that matches your search `,status:200});
    }catch(err){
        res.json({message:err,status:400})
    }
})
//delete Specific product

router.delete('/:productId', async (req,res)=>{
     try{ 
          const product = await Product.findById({_id:req.params.productId});
          var images=product.image;
          console.log(images)
          
          const removeProduct = await Product.deleteOne({_id:req.params.productId});
        //  console.log(removeProduct)
        
          /**const unlinkAsync = promisify(fs.unlink);
                 await unlinkAsync('server/uploads/products/'+image.filename);**/ 

          // Delete the file like normal
          images.forEach( image=>{
             
            fs.unlink('server/uploads/products/'+image.filename,(err) =>{
              if(err){
                  console.error(err)
                  return
              }
 
          })

         
          });

          res.json(removeProduct);

     }catch(err){
         res.json({message:err
        });
     }
});

//update Product
router.patch('/:productId',verify,async (req,res)=> {
    try{

        var oId= new mongoose.Types.ObjectId(req.params.productId);
       
        const value=parseInt(req.body.stock);    
         
        const updateProduct = await Product.findOneAndUpdate(
            {_id:oId},
            { 
                $set:{ price:req.body.price,
                       active:req.body.active,
                       color:req.body.color,
                       size:req.body.size
                       
                  },
                $inc: {'stock.currentstock':value,
                       'stock.alltimestock':value}
             },
             {new:true,useFindAndModify:false}
              
            );
           /*  var newData= {
                stock:updateProduct.stock,
                price:updateProduct.price,
                active:updateProduct.active

             }; */
             
             // Use connect method to connect to the server
          
            res.json(updateProduct);
    }catch(err){
        res.json({message:err});
    }

    /* // eslint-disable-next-line no-unused-vars
    const updateDocument = function(db, _id,callback) {
           client.connect(function(err) {
                assert.equal(null, err);
               const db = client.db(dbName);
   // Get the documents collection
   const collection = db.collection('products');

   const value=parseInt(req.body.stock.currentstock);
    var params={
                $set:{ price:req.body.price,
                   active:req.body.active},
               $inc: {'stock.currentstock':value,
                      'stock.alltimestock':value}
             }
   collection.updateOne({ _id: oId }, params,{new:true, upsert: true },     function(err, result) {
     assert.equal(err, null);
     assert.equal(1, result.result.n);
     console.log(result);
     res.send(result);
        });
    });
      
      }; */
});

//update Product likes
router.patch('/updatelikes/:productId',verify,async (req,res)=> {
    try{

        var oId= new mongoose.Types.ObjectId(req.params.productId);
       
        const value=parseInt(req.body.value);    
         
        const updateProduct = await Product.findOneAndUpdate(
            {_id:oId},
            { 
                $inc: {'likes':value}
             },
             {new:true,useFindAndModify:false}
              
            ).then(()=>{
                
            });
            res.json(updateProduct);
    }catch(err){
        res.json({message:err});
    }
});
module.exports = router;

