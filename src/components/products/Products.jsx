import React from 'react'
import useStyles from './index.js';
import { Grid } from '@material-ui/core';
import Product from './product/Product';
const Products = ({products,onAddToCart}) => {
  const classes=useStyles();
   console.log(products.length)
  return (
    <main className={classes.content}>
      
      <div className={classes.toolbar}>
      </div>
      <Grid container justifyContent="center" spacing={4}>
       {products.map((product) =>(
         <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
           <Product product={product} onAddToCart={onAddToCart}  />
           
         </Grid>
       ))}
      </Grid>
    </main>
  )
}

export default Products
