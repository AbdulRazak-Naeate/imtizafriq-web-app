const router = require('express').Router();
const User = require('../models/User');
const {registerValidation,loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');


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
       email:req.body.email,
       password:hashPassword
   });
   console.log(user)
   try{
       const savedUser = await  user.save();
     // res.send(savedUser);
     res.send({_id:user._id,name:user.name,status:200}).status(200);

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
      _id:user.id,name:user.name,
      email:user.email
    }).status(400);
   // res.send('Logged in!');


});


module.exports = router;
