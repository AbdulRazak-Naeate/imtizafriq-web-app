const router = require('express').Router();
const User = require('../models/User');
const {registerValidation,loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const {uploadImage,updateImage}= require('../upload');
var mongoose=require('mongoose');

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
router.post('/register',async (req,res) => {

    //VALIDATION
    const {error}=registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
 
    //checkid user is already exist
   const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');
    

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);
    
    //create new user
   const user = new User({
       name:req.body.name,
       fullname:'',
       email:req.body.email,
       phone:'',
       password:hashPassword,
       location:'',
       image:[
        {
          "fieldname": "image",
          "originalname": "ntslogo21.png",
          "encoding": "7bit",
          "mimetype": "image/png",
          "destination": "./server/uploads/stores",
          "filename": "Naeate Computers and Accessories-1635194834134.png",
          "path": "server\\uploads\\stores\\Naeate Computers and Accessories-1635194834134.png",
          "size": 12915
        }
      ],
   });
   console.log(user)
   try{
       const savedUser = await  user.save();
     // res.send(savedUser);
        //Create and asigned a token
   const token = jwt.sign({_id:savedUser.id},process.env.TOKEN_SECRET);

     res.header('auth-token',token).send({
               auth_token:token,
               _id:user._id,
               name:user.name,
               fullanme:user.fullname,
               phone:user.phone,
               email:user.email,
               location:user.location,
              
               status:200}).status(200);

   }catch(err){
       res.status(400).send(err);
      console.log(err);
      res.send(err);
  }
});


 //LOGIN
router.post('/login',async (req,res)=>{
  //VALIDATION
  const {error}=loginValidation(req.body);
  if (error) return res.status(401).send(error.details[0].message);

    //checking if email exists
   const user = await User.findOne({email:req.body.email});
   if(!user) return res.status(401).send('Email is not found');

   //Check if passowrd is correct
   const validPass = await bcrypt.compare(req.body.password,user.password);
   if (!validPass) return res.status(401).send('Invalid password');
   
   //Create and asigned a token
   const token = jwt.sign({_id:user.id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send({
      auth_token:token,
      _id:user.id,name:user.name,
      fullname:user.fullname,
      email:user.email,
      phone:user.phone,
      location:user.location,
    }).status(400);
   // res.send('Logged in!');


});
//update User
router.patch('/:userId',async (req,res)=> {
  try{

      var oId= new mongoose.Types.ObjectId(req.params.userId);
      var query= {
          fullname:req.body.fullname,
          email:req.body.email,
          phone:req.body.phone,
          location:req.body.location
       };
       //console.log(req.body)
      const updateUser = await User.findOneAndUpdate(
          {_id:oId},
          {$set:
               query
           },
           {new:true,useFindAndModify:false}
            
          );
          var newData= {   
              fullname:updateUser.fullname,
              email:updateUser.email,
              phone:updateUser.phone,
              location:updateUser.location
           };
           var updated=JSON.stringify(query)===JSON.stringify(newData)
           if(!updated) return res.status(400).send("user not modified");
          res.json(updateUser);
  }catch(err){
      res.json({message:err});
  }
});


router.post('/updateImage/:userId',updateImage('./server/uploads/users'),async (req,res)=>{
  try{
    //update iamge field in user
    var oId= new mongoose.Types.ObjectId(req.params.userId);
    var query= {image:req.files };
     //console.log(req.body)
    const updateUser = await User.findOneAndUpdate(
        {_id:oId},
        {$set: query},
         {new:true,useFindAndModify:false}
          
        );
    res.json({message:"image updated",status:200});
  }catch(err){

      res.json({message:err})
  }
});
module.exports = router;
