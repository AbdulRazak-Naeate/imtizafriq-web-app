const express   = require('express');
const Contact = require('../models/Contact');
const router    =  express.Router();

//get Contacts 
router.get('/',async(req,res)=>{
    try{
       const Contacts= await Contact.find()
     
       res.json({contacts:Contacts,status:200});
      }catch(err){
          console.log(err);
      }
})

//post new link

router.post('/', async (req,res)=>{
    try{
        const isContacsExist = await Contact.findOne({linktype:req.body.linktype});
       if (isContacsExist){
           console.log('contact exist ... ')

             const updatecontact = await Contact.findOneAndUpdate({contacttype:req.body.contacttype},{
                 $set:{
                     contacts:JSON.parse(req.body.contacts)
                 }
             },{new:true,useFindAndModify:false}
             );
             res.json({contacts:updatecontact,status:200});

       }else{
             const Contacts = new Contact({contacttype:req.body.contacttype,contacts:JSON.parse(req.body.contacts)});
            const savedContact = await Contacts.save();
            res.json({contacts:savedContact,status:200});

       }
      
    }catch(err){
        console.log(err)
    }
});

//get Contacts by productid

router.get('/:name',async(req,res)=>{
     try{
         console.log(req.params)
        const contact = await Contact.findOne({name:req.params.name});
        
        res.json({contacts:contact,status:200});
       }catch(err){

           console.log(err);
       }
})

module.exports =router;
