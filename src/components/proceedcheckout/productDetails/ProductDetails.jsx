import { Card,Typography,Button, CardContent} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';

import React from 'react';
import useStyles from './styles';
import {Link } from 'react-router-dom';


const ProductDetails = ({product}) => {
    const classes =useStyles();
    console.log(product)
  return (
    <div className={classes.root} >
       <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
         <div className={classes.contentSub}>
         <Typography variant="h4" className={classes.descrption}>
              {product.name}
          </Typography>
         
          <Typography variant="body1">
              {product.description}
          </Typography>
         </div>
         <div className={classes.actions}>
         <Button to="/" component={Link} variant='outlined'>Back to Home</Button>
           <Button type="submit" variant="contained" color="primary">Add to  Cart <AddShoppingCart/>  
          </Button>
         </div>
        </CardContent>

       </Card>
    </div>
  )
}

export default ProductDetails
