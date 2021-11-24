// eslint-disable-next-line no-unused-vars
const axios  = require('axios');
const router = require('express').Router();

router.get('/:transactionid',async(req,res)=>{
     try{
        var url=`https://api.flutterwave.com/v3/transactions/${req.params.transactionid}/verify`
        const options = {
              method: 'GET',
              headers: { 'Content-Type': 'application/json',
                         'Authorization': 'Bearer {{FLWSECK-4a4276fc8db17e89d7d896bb3d504595-X}}' },
              url,
           };
          axios(options).then((response)=>{
              console.log(response)
          res.send(response);
      });
     }catch(err){

     }
})

module.exports = router