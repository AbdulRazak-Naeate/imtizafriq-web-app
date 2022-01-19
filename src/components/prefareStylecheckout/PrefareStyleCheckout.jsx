import React from 'react';
import{Grid} from '@mui/material';
import ImageView from './imageview/ImageView';
import ProductDetails from './productDetails/ProductDetails';
import useStyles from './styles';

const PrefareStyleCheckout = () => {
    const classes=useStyles();
  return (
    <div className={classes.content}> 
        <Grid container justifyContent="center" spacing={1}>
        
        <Grid item={true} xs={12} sm={12} md={6} lg={6}>
        <ImageView className={classes.imageView}/> 
       
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
