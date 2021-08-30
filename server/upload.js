const multer  = require('multer');


const uploadImage = (uploadpath)=>{

    //Images Upload path and file names
  const storage = multer.diskStorage({

    destination: function (req,file,cb){
        cb(null, uploadpath);
    },
    filename: function (req,file,cb) {
        cb(null,file.originalname);
    }
  });

   //upload image file
    const uploadImage = multer({storage:storage}).array('image',3);
   return uploadImage; 
  }

module.exports.uploadImage=uploadImage;