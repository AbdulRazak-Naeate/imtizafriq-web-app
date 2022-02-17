const express   = require('express');
const SocialmediaLinks = require('../models/SocialmediaLinks');
const router    =  express.Router();

//get Socialmedialinks 
router.get('/',async(req,res)=>{
    try{
       const Socialmedialinks= await SocialmediaLinks.find()
     
       res.json({socialmedialinks:Socialmedialinks,status:200});
      }catch(err){
          console.log(err);
      }
})

//post new link

router.post('/', async (req,res)=>{
    try{
        const islinkExist= await SocialmediaLinks.findOne({linktype:req.body.linktype});
       if (islinkExist){
           console.log('link exist ... ')

             const updatelink = await SocialmediaLinks.findOneAndUpdate({linktype:req.body.linktype},{
                 $set:{
                     medialinks:JSON.parse(req.body.medialinks)
                 }
             },{new:true,useFindAndModify:false}
             );
             res.json({socialmedialinks:updatelink,status:200});

       }else{
             const Socialmedialinks = new SocialmediaLinks({linktype:req.body.linktype,medialinks:JSON.parse(req.body.medialinks)});
            const savedSocialmedialinks = await Socialmedialinks.save();
            res.json({socialmedialinks:savedSocialmedialinks,status:200});

       }
      
    }catch(err){
        console.log(err)
    }
});

//get Socialmedialinks by productid

router.get('/:name',async(req,res)=>{
     try{
         console.log(req.params)
        const Socialmedialinks = await SocialmediaLinks.findOne({name:req.params.name});
        
        res.json({sociallinks:Socialmedialinks,status:200});
       }catch(err){

           console.log(err);
       }
})

module.exports =router;
