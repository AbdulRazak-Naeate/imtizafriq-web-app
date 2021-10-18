const multer  = require('multer');


const uploadImage = (uploadpath)=>{

    //Images Upload path and file names
  const storage = multer.diskStorage({

    destination: function (req,file,cb){
        cb(null, uploadpath);
    },
    filename: function (req,file,cb) {
         
         var filename=req.body.name+'-'+Date.now()+'.'+file.originalname.split('.').pop();
        cb(null,filename);
    }
  });

   //upload image file
    const uploadImage = multer({storage:storage}).array('image',3);
    return uploadImage; 
  }

  
const updateStoreImage = (uploadpath)=>{

  //Images Upload path and file names
const storage = multer.diskStorage({

  destination: function (req,file,cb){
      cb(null, uploadpath);
  },
  filename: function (req,file,cb) {
       
       var filename=req.body.imagename+'.'+file.originalname.split('.').pop();
      cb(null,filename);
  }
});

 //upload image file
  const uploadImage = multer({storage:storage}).array('image',3);
  return uploadImage; 
}

module.exports.uploadImage=uploadImage;
module.exports.updateStoreImage=updateStoreImage;