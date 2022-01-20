import React,{useState} from 'react';
import{Grid} from '@mui/material';
import ImageView from './imageview/ImageView';
import ProductDetails from './productDetails/ProductDetails';
import useStyles from './styles';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import axios from 'axios';

const PrefareStyleCheckout = () => {
    const classes=useStyles();
    const [productImages,setProductImages]=useState([]);

   
const initiateAndCreateProduct =()=>{
  
  const url = 'http://localhost:3001/api/products/';

  //console.log(colors);
  const formData = new FormData();
  //getInput values
 // let colors = getInputValues('color-specs');
  //let sizes  = getInputValues('size-specs');

 /*  for (let i = 0; i < colors.length; i++) {
     if(colors[i]!==""){
      formData.append('color', colors[i]);
     }
  } */
 /*  for (let j = 0; j < sizes.length; j++) {
    if (sizes[j]!==""){
      formData.append('size', sizes[j]);
    }
  } */
  /* formData.append('name', name);
  formData.append('price', price);
  formData.append('category',category);
  formData.append('description', description);
  formData.append('specification', specification);
  formData.append('digital_product_url', digitalProductUrl);//append digital
  formData.append('storeId', storeid);
  formData.append('stock',stock);
  formData.append('active',active) */
  console.log(JSON.stringify(formData));

  //append files to image to create an a file array

  for (var i = 0; i <= productImages.length; i++) {
    formData.append('image', productImages[i]);
    //console.log(productImages);
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
     /*  'auth-token': user.auth_token, */
    },
  }
  return axios.post(url, formData, config)

};
 initiateAndCreateProduct().then((response) => {
        console.log(response.data);
       if (response.data.status===200){
        //window.location.reload();
         
          //clearFields();
       }else if (response.data.status===400){ 

        Alert.error(response.data.message, {
          position: 'top-right',
          effect: 'jelly'

      });
     // history.go(0);
       }
      }); 

  return (
    <div className={classes.content}> 
        <Grid container justifyContent="center" spacing={1}>
        
        <Grid item={true} xs={12} sm={12} md={6} lg={6}>
        <ImageView  productImages={productImages}className={classes.imageView}/> 
       
        </Grid>
        <Grid item={true} xs={12} sm={12} md={5} lg={4}> 
        <ProductDetails/>
         {/*   <ProductDetails product={product} onAddToCart={onAddToCart}/>
           */}
        </Grid>
         
         </Grid>
         

         </div>
  )
}

export default PrefareStyleCheckout
