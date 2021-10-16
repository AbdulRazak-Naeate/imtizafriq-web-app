const Joi = require ('@hapi/joi');


//VALIDATION
const registerValidation = data =>{
  const schema = Joi.object({
    name:Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()
   });

   return   schema.validate(data);
   
};

const loginValidation = data =>{
    const schema = Joi.object({
      email:Joi.string().min(6).required(),
      password:Joi.string().min(6).required()
     });
  
     return   schema.validate(data);
     
  };
  
  const requestValidation = data =>{
    const schema = Joi.object({
    
      productId:Joi.string().min(20).required(),
      storeId:Joi.string().min(20).required(),
      quantity:Joi.string().min(1).required(),
      color:Joi.string(),
      size:Joi.string(),
      priceEach:Joi.string().required(),
      totalPrice:Joi.string().required(),
      status:Joi.string().required(), 
      userId:Joi.string().min(20).required(),
      paymentMethod:Joi.string().required(),

     });
  
     return  schema.validate(data);
     
  };

  const storeValidation = data =>{
    const schema = Joi.object({
      name:Joi.string().min(6).required(),
      country:Joi.string().required(),
      state:Joi.string().required(),
      city:Joi.string().required(),
      phone:Joi.string().min(10).required(),
      email:Joi.string().min(6).required().email(),
      description:Joi.string().min(10).required(), 
      userId:Joi.string().min(20).required(),
      storeCategoryId:Joi.string().min(4).required(),
      validStatus:Joi.string().min(5).required(),
      ghPostGPS:Joi.string(),
      image:Joi.any()
    });
    return schema.validate(data);
    };

    const storeCategoryValidation = data =>{
      const schema = Joi.object({
      
        short_code:Joi.string().min(4).required(),
        name:Joi.string().required()
       });
  
     return  schema.validate(data);
     
  };

  const productValidation = data =>{

    const schema = Joi.object({
      name:Joi.string().min(6).required(),
      description:Joi.string().min(20).required(),
      specification:Joi.string().min(2).required(),
      price:Joi.string().min(1).required(),
      storeId:Joi.string().min(18).required(),
      stock:Joi.string().min(1),
      active:Joi.string().min(2),
      color:Joi.any(),
      size:Joi.any(),
      image:Joi.any(),
      digital_product_url:Joi.any(),
     });
  
     return   schema.validate(data);
     
  };
  module.exports.registerValidation = registerValidation;
  module.exports.loginValidation    = loginValidation;
  module.exports.storeValidation    = storeValidation;
  module.exports.storeCategoryValidation    = storeCategoryValidation;
  module.exports.productValidation  = productValidation;
  module.exports.requestValidation  = requestValidation;

