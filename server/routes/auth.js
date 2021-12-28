const router = require('express').Router();
const User = require('../models/User');
const {registerValidation,loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const {updateImage}= require('../upload');
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
    if (error) return res.status(400).send({message:error.details[0].message});
 
    //checkid user is already exist
   const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');
    

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
            area:'null',
            
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
               location:user.location,
               image:user.image,
               address:user.address,
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
    var user=User()
    user = await User.findOne({email:req.body.email});
   if(!user) {
      user =await User.findOne({username:req.body.email});
     if(!user) return res.status(401).send('Email/Username  not found');
   }
   //Check if passowrd is correct
   const validPass = await bcrypt.compare(req.body.password,user.password);
   if (!validPass) return res.status(401).send('Invalid password');
   
   //Create and asigned a token
   const token = jwt.sign({_id:user.id},process.env.TOKEN_SECRET);
    res.header('auth-token',token).send({
      auth_token:token,
      _id:user.id,
      username:user.username,
      firstname:user.firstname,
      lastname:user.lastname,
      email:user.email,
      phone:user.phone,
      location:user.location,
      image:user.image
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
              firstname:updateUser.firstname,
              lastname:updateUser.lastname,
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
