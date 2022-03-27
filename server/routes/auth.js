const router = require('express').Router();
const User = require('../models/User');
const {registerValidation,loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const {updateImage}= require('../upload');
var mongoose=require('mongoose');
const { cloudinary } = require('../cloudinary');

//Get a  specific user
router.get('/',async(req,res)=>{
  try{
      const users= await User.find();
      res.send({users:users,message:"successful"});
  
  }catch(err){
      res.json({message:err});
  }
});
//Get a  specific user
router.get('/:userId',async(req,res)=>{
  try{
      const user= await User.findOne({_Id:req.body.userId});
      res.send({name:user.name,email:user.email});
  
  }catch(err){
      res.json({message:err});
  }
});
/* //veify google sign in user with email and assign token
router.get('/check/email/:email',async(req,res)=>{
  try{
         //checkid user is already exist
    const user = await User.findOne({email:req.params.email});
    if(user){
       //LogIn and asigned a token
   const token = jwt.sign({_id:user.id},process.env.TOKEN_SECRET);
   res.header('auth-token',token).send({
     auth_token:token,
     _id:user.id,
     username:user.username,
     firstname:user.firstname,
     lastname:user.lastname,
     email:user.email,
     phone:user.phone,
     image:user.image,
     address:user.address,
     comfirmed:user.confirmed

   }).status(400);
      }else{
        return res.status(200).send({user:[],message:'Email not exists'});
        
      }
     // res.send({user:emailExist});
  
  }catch(err){
      res.json({message:err});
  }
}); */
router.post('/register',async (req,res) => {

    //VALIDATION
    const {error}=registerValidation(req.body);
    if (error) return res.status(400).send({message:error.details[0].message});
 
    //checkid user is already exist
    const emailExist = await User.findOne({email:req.body.email});
      if (req.body.fromGoogle===true){
         if (emailExist){
          try{
           
             //Create and asigned a token
        const token = jwt.sign({_id:emailExist.id},process.env.TOKEN_SECRET);
     
          res.header('auth-token',token).send({
                    auth_token:token,
                    _id:emailExist._id,
                    username:emailExist.username,
                    firstname:emailExist.firstname,
                    lastname:emailExist.lastname,
                    phone:emailExist.phone,
                    email:emailExist.email,
                    image:emailExist.image,
                    address:emailExist.address,
                    status:200}).status(200);
     
        }catch(err){
            res.status(400).send(err);
            console.log(err);
           res.send(err);
       }
         }else{
                CreateNewUser(req,res,true);
         }
      }else{
         
    if(emailExist) return res.status(400).send('Email already exists');
    
      CreateNewUser(req,res);
    /* //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    
    //create new user
   const user = new User({
       username:req.body.username,
       firstname:req.body.firstname,
       lastname:req.body.lastname,
       email:req.body.email,
       phone:req.body.phone,
       password:hashPassword,
       image:[{}],
       address:{
            country:'null',
            state:'null',
            city:'null',
            street:'null',
            aprt_suit_num:'null'
            
        },
   });
   try{
       const savedUser = await  user.save();
         // res.send(savedUser);
        //Create and asigned a token
   const token = jwt.sign({_id:savedUser.id},process.env.TOKEN_SECRET);

     res.header('auth-token',token).send({
               auth_token:token,
               _id:user._id,
               username:user.username,
               firstname:user.firstname,
               lastname:user.lastname,
               phone:user.phone,
               email:user.email,
               image:user.image,
               address:user.address,
               status:200}).status(200);

   }catch(err){
       res.status(400).send(err);
       console.log(err);
      res.send(err);
  }
 */
  
  }
});

const CreateNewUser = async(req,res)=> {
    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
   //create new user
   const user = new User({
    username:req.body.username,
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    email:req.body.email,
    phone:req.body.phone,
    password:hashPassword,
    image:[{}],
    address:{
         country:'null',
         state:'null',
         city:'null',
         street:'null',
         aprt_suit_num:'null'
         
        },
    fromGoogle:req.body.fromGoogle
});
try{
    const savedUser = await  user.save();
      // res.send(savedUser);
     //Create and asigned a token
const token = jwt.sign({_id:savedUser.id},process.env.TOKEN_SECRET);

  res.header('auth-token',token).send({
            auth_token:token,
            _id:user._id,
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            phone:user.phone,
            email:user.email,
            image:user.image,
            address:user.address,
            status:200}).status(200);

}catch(err){
    res.status(400).send(err);
    console.log(err);
   res.send(err);
}

}


 //LOGIN
router.post('/login',async (req,res)=>{
  //VALIDATION
  const {error}=loginValidation(req.body);
  if (error) return res.status(401).send(error.details[0].message);

    //checking if email exists
    var user=User()
    user = await User.findOne({email:req.body.email});
   if(!user) {
      user =await User.findOne({username:req.body.email});
     if(!user) return res.status(401).send('Email/Username  not found');
   }
   //Check if passowrd is correct
   const validPass = await bcrypt.compare(req.body.password,user.password);
   if (!validPass) return res.status(401).send('Invalid password');
   
   //LogIn and asigned a token
   const token = jwt.sign({_id:user.id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send({
      auth_token:token,
      _id:user.id,
      username:user.username,
      firstname:user.firstname,
      lastname:user.lastname,
      email:user.email,
      phone:user.phone,
      image:user.image,
      address:user.address,
      comfirmed:user.confirmed

    }).status(400);
   // res.send('Logged in!');


});
//update User
router.patch('/:userId',async (req,res)=> {
  try{

      var oId= new mongoose.Types.ObjectId(req.params.userId);
      var query= {
          firstname:req.body.firstname,
          lastname:req.body.lastname,
          email:req.body.email,
          phone:req.body.phone,
          role:req.body.role,
          address:req.body.address
       };
      // console.log(req.body)
       await User.findOneAndUpdate(
          {_id:oId},
          {$set:
               query
           },
           {new:true,useFindAndModify:false}
            
          ).then(ret=>{
            console.log(ret)
             var newData = {   
              firstname:ret.firstname,
              lastname:ret.lastname,
              email:ret.email,
              phone:ret.phone,
              role:ret.role,
              address:ret.address
           };
           var updated=JSON.stringify(query)===JSON.stringify(newData)
           if(!updated) return res.status(400).send("user not modified");
          res.json(ret);
          });
        
         
  }catch(err){
      res.json({message:err});
  }
});


router.post('/updateImage/:userId'/* ,updateImage('./server/uploads/users') */,async (req,res)=>{
  try{
    //update iamge field in user
    var oId= new mongoose.Types.ObjectId(req.params.userId);
   // var query= {image:req.files };
     //console.log(req.body)

     var imageUrls=[];
     var base64encImages=req.body.encodedimages
     try {
         
             const uploadResponse = await cloudinary.uploader.upload(base64encImages, {
                 upload_preset: 'users',
                 transformation: [
                  {width: 150, height: 150, gravity: "face", crop: "thumb"},
                  ]
             });
             //console.log(uploadResponse);
 
             imageUrls.push(uploadResponse);     
         
        console.log({ urls:imageUrls });
     } catch (err) {
         console.error(err);
     }
 
     if (imageUrls.length<=0) return res.json({status:400,message:"error uploading  image"});
    
     var query= {image:imageUrls[0]};
    const updateUser = await User.findOneAndUpdate(
        {_id:oId},
        {$set: query},
         {new:true,useFindAndModify:false}
          
        );
    res.json({message:"image updated",status:200});//returning image not neccesory image already updated on user click
  }catch(err){

      res.json({message:err})
  }
});
module.exports = router;
