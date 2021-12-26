const Joi = require ('@hapi/joi');


//VALIDATION
const registerValidation = data =>{
  const schema = Joi.object({
    username:Joi.string().min(6).required(),
    firstname:Joi.string(),
    lastname:Joi.string(),
    email:Joi.string().min(6).required().email(),
    phone:Joi.string(),
    address:Joi.any(),
    password:Joi.string().min(6).required(),
    confirmed:Joi.string(),
    image:Joi.any()
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
  
  const orderValidation = data =>{
    const schema = Joi.object({
      name:Joi.string(),
      firstname:Joi.string(),
      lastname:Joi.string(),
      email:Joi.string(),
      phone:Joi.string(),
      country:Joi.string(),
      state:Joi.string(),
      city:Joi.string(),
      street:Joi.string(),
      homeAddress:Joi.string(),
      productId:Joi.string().min(20),
      storeId:Joi.string().min(20),
      orderNumber:Joi.string().min(8),
      quantity:Joi.number().min(1),
      size:Joi.string().min(0),
      color:Joi.string().min(0),
      measurement:Joi.object(),
      filename:Joi.string(),
      priceEach:Joi.number(),
      totalPrice:Joi.number(),
      status:Joi.string(), 
      userId:Joi.string().min(20),
      paymentMethod:Joi.string(),
      customer:Joi.object(),
      shippingData:Joi.object()
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
      currency:Joi.string().required(),
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
      price:Joi.number().required(),
      storeId:Joi.string().min(18).required(),
      stock:Joi.any(),
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
  module.exports.orderValidation  = orderValidation;

